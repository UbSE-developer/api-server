import UserDAO from "../../model/dao/user";
import UserDTO from "../../model/dto/user";
import { ResponseType } from "../../model/type/response/common";
import { ExistCheckType } from "../../model/type/response/user";
import { HashingToSalt } from "../../common/util";
import { USER_STATE } from "@src/model/type/user";

export class UserService {

    private userDTO: UserDTO;
    private userDAO: UserDAO;

    constructor(user: UserDTO) {
        this.userDTO = user;
        this.userDAO = new UserDAO();
    }

    SignUp = async (): Promise<ResponseType> => {
        const response: ResponseType = {
            status: 200,
            message: "",
            data: undefined
        };
        const checkUser: ExistCheckType[] = await this.userDAO.checkUser('hhh');
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
}