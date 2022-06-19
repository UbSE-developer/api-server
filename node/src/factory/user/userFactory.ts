import UserDTO from "../../model/dto/user";
import { UserService } from "../../service/user/userService";

export class UserFactory {
    getUserServiceInstance = async (user?: UserDTO, file?: Express.Multer.File): Promise<UserService> => {
        return new UserService(user, file);
    };
}