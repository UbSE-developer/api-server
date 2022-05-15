import { UserFactory } from "./user/userFactory"

export class Factory {
    getUserFactory = (): UserFactory => {
        return new UserFactory();
    }
}