import { UserFactory } from './../../factory/user/userFactory';
import { UserType } from './../../model/type/user';
import express from 'express';
import UserDTO from '../../model/dto/user';
import { Factory } from '../../factory';
import { UserService } from '../../service/user/userService';

const UserRouter = express.Router();

UserRouter.get('/', async(request: express.Request, response: express.Response) => {
    response.status(200).send('dd');
});

UserRouter.post('/signup', async (request: express.Request, response: express.Response) => {
    const userDTO = new UserDTO(request.body as UserType);

    const userFactory: UserFactory = new Factory().getUserFactory();
    const userService: UserService = userFactory.getUserServiceInstance(userDTO);

    const responseData = await userService.SignUp();

    response.status(responseData.status).send(responseData);
})
export default UserRouter;