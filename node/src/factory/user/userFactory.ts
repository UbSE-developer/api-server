import UserDTO from "../../model/dto/user";
import { UserService } from "../../service/user/userService";

export class UserFactory {
    getUserServiceInstance = (user: UserDTO): UserService => {
        return new UserService(user);
    };
}