import { UserType, USER_STATE } from "../type/user";

class UserDTO { // Database Transfer Object

    private userData: UserType;

    constructor(user: UserType) {
        this.userData = user;
    }

    getUser = (): UserType => {
        return this.userData;
    };

    setUser = (user: UserType): void => {
        this.userData = user;
    };

    getName = (): string => {
        return this.userData.name;
    };

    setName = (userName: string): void => {
        this.userData.name = userName;
    };

    getPassword = (): string => {
        return this.userData.password;
    };

    setPassword = (password: string): void => {
        this.userData.password = password;
    };

    getUserID = (): string => {
        return this.userData.user_id;
    };

    setUserID = (userID: string): void => {
        this.userData.user_id = userID;
    };

    getIntroduction = (): string => {
        return this.userData.introduction;
    };

    setIntroduction = (introduction: string): void => {
        this.userData.introduction = introduction;
    };

    getUserAuth = (): string => {
        return this.userData.user_auth;
    };

    setUserAuth = (userAuth: string): void => {
        this.userData.user_auth = userAuth;
    };

    getSex = (): string => {
        return this.userData.sex;
    };

    setSex = (sex: string): void => {
        this.userData.sex = sex;
    };

    getSalt = (): string => {
        return this.userData.salt;
    };

    setSalt = (salt: string): void => {
        this.userData.salt = salt;
    };

    getImage = (): string => {
        return this.userData.image;
    };

    setImage = (image: string): void => {
        this.userData.image = image;
    };

    getState = (): USER_STATE => {
        return this.userData.state;
    };

    setState = (state: USER_STATE): void => {
        this.userData.state = state;
    };
}

export default UserDTO;