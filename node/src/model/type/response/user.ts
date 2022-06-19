export type ExistCheckType = {
    exist_check: number;
};

export type SearchUserInfoCheckType = {
    user_id: string;
    user_auth: string;
    name: string;
    salt: string;
    hash_pass: string;
}