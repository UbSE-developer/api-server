import { UserFactory } from './../../factory/user/userFactory';
import { UserType } from './../../model/type/user';
import express from 'express';
import UserDTO from '../../model/dto/user';
import { Factory } from '../../factory';
import { UserService } from '../../service/user/userService';
import { UploadFile } from '../../common/file';

const UserRouter = express.Router();

UserRouter.get('/', async(request: express.Request, response: express.Response) => {
    response.status(200).send('dd');
});

UserRouter.get('/info/:userId', async(request: express.Request, response: express.Response) => {
    const userId = request.params.userId;
    const userFactory: UserFactory = new Factory().getUserFactory();
    const userService: UserService = await userFactory.getUserServiceInstance();

    const responseData = await userService.SearchUserInfo(userId);

    response.status(responseData.status).send(responseData);
});

UserRouter.post('/signup', async (request: express.Request, response: express.Response) => {
    const userDTO = new UserDTO(request.body as UserType);

    const userFactory: UserFactory = new Factory().getUserFactory();
    const userService: UserService = await userFactory.getUserServiceInstance(userDTO);

    const responseData = await userService.SignUp();

    response.status(responseData.status).send(responseData);
});

UserRouter.post('/signin', async (request: express.Request, response: express.Response) => {
    const userDTO = new UserDTO(request.body as UserType);

    const userFactory: UserFactory = new Factory().getUserFactory();
    const userService: UserService = await userFactory.getUserServiceInstance(userDTO);

    const responseData = await userService.SignIn();

    response.status(responseData.status).send(responseData);
});

UserRouter.post('/update', async (request: express.Request, response: express.Response) => {
    const userDTO = new UserDTO(request.body as UserType);

    const userFactory: UserFactory = new Factory().getUserFactory();
    const userService: UserService = await userFactory.getUserServiceInstance(userDTO);

    const responseData = await userService.UpdateUser();
    response.status(responseData.status).send(responseData);
});

// TODO
// uploads 폴더 생성 고민하기...
UserRouter.post('/profile-image/update', UploadFile.single('profile'), async (request: express.Request, response: express.Response) => {
    const profileImage = request.file as Express.Multer.File;
    const userDTO = new UserDTO(request.body as UserType);

    const userFactory: UserFactory = new Factory().getUserFactory();
    const userService: UserService = await userFactory.getUserServiceInstance(userDTO, profileImage);

    const responseData = await userService.ChangeProfileImage();

    response.status(responseData.status).send(responseData);
});

export default UserRouter;