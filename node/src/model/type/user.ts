export enum USER_STATE {
    BASIC = 0,
    LOCK = 1,
    SECESSION = 2,
}

export type UserType = {
    user_id: string;
    password: string;
    name: string;
    introduction: string;
    user_auth: string;
    sex: string;
    salt: string;
    image: string;
    state: USER_STATE;
}