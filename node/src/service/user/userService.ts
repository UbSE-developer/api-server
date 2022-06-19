import { DEFAULT_PORT } from './../../common/const';
import UserDAO from "../../model/dao/user";
import UserDTO from "../../model/dto/user";
import path from 'path';
import { ResponseType } from "../../model/type/response/common";
import { ExistCheckType, SearchUserInfoCheckType } from "../../model/type/response/user";
import { HashingToSalt, IsNull } from "../../common/util";
import { UserType, USER_STATE } from "../../model/type/user";
import { DEFAULT_URL, DEFAULT_VERSION } from "../../common/const"
import { fileRemove } from '../../common/file';

export class UserService {

    private userDTO: UserDTO;
    private userDAO: UserDAO;
    private profileImage: Express.Multer.File;

    constructor(user: UserDTO, file: Express.Multer.File) {
        this.userDTO = user;
        this.userDAO = new UserDAO();
        this.profileImage = file;
    }

    SearchUserInfo = async (userId: string): Promise<ResponseType> => {
        const response: ResponseType = {
            status: 200,
            message: '',
            data: null,
        };
        const userData: UserType[] = await this.userDAO.searchUserData(userId);
        if (userData.length === 0) {
            response.status = 400;
            response.message = '존재하지 않는 사용자입니다. / Not exist user.'
            return response;
        }

        response.message = 'Success';
        response.data = userData[0];
        return response;
    }

    SignUp = async (): Promise<ResponseType> => {
        const response: ResponseType = {
            status: 200,
            message: "",
            data: null,
        };
        const checkUser: ExistCheckType[] = await this.userDAO.checkUser(this.userDTO.getUserID());
        if (checkUser[0].exist_check){
            response.status = 500;
            response.message = '이미 가입되어있는 회원입니다. / Already Exist User';
            return response;
        }

        const passwordHash = await HashingToSalt(this.userDTO.getPassword());
        this.userDTO.setSalt(passwordHash.salt);
        this.userDTO.setPassword(passwordHash.data);
        this.userDTO.setState(USER_STATE.BASIC);
        const userInsertData = await this.userDAO.insertUser(this.userDTO);
        if (userInsertData) {
            response.data = userInsertData;
        } else {
            response.status = 500;
            response.message = 'Error!!';
        }
        return response;
    };

    SignIn = async (): Promise<ResponseType> => {
        const response: ResponseType = {
            status: 200,
            message: "",
            data: null,
        };

        if (!IsNull(this.userDTO.getUserID())) {
            response.status = 400;
            response.message = 'ID는 로그인에 필수요소입니다. / ID is Mandatory field';
            return response;
        }

        if (!IsNull(this.userDTO.getPassword())) {
            response.status = 400;
            response.message = 'PW는 로그인에 필수요소입니다. / PW is Mandatory field';
            return response;
        }

        const userData: SearchUserInfoCheckType[] = await this.userDAO.searchUserInfo(this.userDTO);
        if (userData.length === 0){
            response.status = 401;
            response.message = '존재하지 않는 회원입니다. / No data User.';
            return response;
        }

        const user = userData[0];

        const insertPassword = this.userDTO.getPassword();
        const hashedPassword = user.hash_pass;
        const salt = user.salt;
        const passwordHash = await HashingToSalt(insertPassword, salt);

        if (passwordHash.data !== hashedPassword) {
            response.status = 401;
            response.message = 'ID 혹은 PW가 잘못되었습니다. / Incorrect ID or PW.'
            return response;
        }
        response.data = user;
        response.message = '로그인 성공. / Login Success';
        return response;
    };

    UpdateUser = async () : Promise<ResponseType> => {
        const response: ResponseType = {
            status: 200,
            message: "",
            data: null,
        };

        return response;
    }

    ChangeProfileImage = async () : Promise<ResponseType> => {
        const response: ResponseType = {
            status: 200,
            message: "",
            data: null,
        };

        const userData: UserType[] = await this.userDAO.searchUserData(this.userDTO.getUserID());
        if (userData.length === 0) {
            response.status = 400;
            response.message = '존재하지 않는 사용자입니다. / Not exist user.'
            return response;
        }
        const user = userData[0];
        const ext = IsNull(this.profileImage) ? 'null' : path.extname(this.profileImage.originalname);
        if (ext === 'null') {
            fileRemove(user.image);
            await this.userDAO.updateUserImage(this.userDTO, '');
        } else if (ext !== ".jpeg" || ".png" || ".jpg") {
            response.status = 400;
            response.message = '프로필에는 이미지만 사용할 수 있습니다. / Only Image file.'
            return response;
        }
        const filePath = typeof this.profileImage === 'undefined' ? '' : this.profileImage.path;
        await this.userDAO.updateUserImage(this.userDTO, filePath);


        response.message = '정상적으로 등록되었습니다. / Good.';
        const userInfoData = {
            'user_id': this.userDTO.getUserID(),
            'image': filePath,
            'image_path': DEFAULT_URL + '/' + DEFAULT_PORT + DEFAULT_VERSION + '/' + filePath,
        };

        response.data = userInfoData;
        return response;
    };
}