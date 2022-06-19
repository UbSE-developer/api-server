import { SearchUserData, SearchUserInfo, UpdateUserImage } from './../../common/database/query';
import { Connection } from "../../common/database/dbInfo";
import { ExistUserCheck, UserInsert } from "../../common/database/query";
import UserDTO from "../dto/user";
import { ExistCheckType, SearchUserInfoCheckType } from "../type/response/user";
import { UserType } from "../type/user";

class UserDAO { // Database Access Object

    // TODO
    // Promise Architecture modify!!!
    checkUser = async (userID: string): Promise<ExistCheckType[]> => {
        return new Promise((resolve) => {
            Connection((conn) => {
                conn.query(ExistUserCheck, [userID, userID], (err, res) => {
                    if (err) {
                        console.error(err.errno + ' ' + err.message);
                    } else {
                        resolve(res);
                    }
                });
                conn.release();
            });
        });
    };

    insertUser = async (user: UserDTO): Promise<UserType> => {
        const userInsertQuery = `${UserInsert} VALUES ('${user.getName()}', '${user.getPassword()}', '${user.getUserID().trim()}', '${user.getUserAuth().trim()}', '${user.getSalt()}', '0')`;
        return new Promise((resolve) => {
            Connection((conn) => {
                conn.query(userInsertQuery, [], (err, res) => {
                    if (err) {
                        console.error(err.errno + ' ' + err.message);
                    } else {
                        resolve(res);
                    }
                });
                conn.release();
            });
        });
    };

    searchUserInfo = async (user: UserDTO): Promise<SearchUserInfoCheckType[]> => {
        const userId = user.getUserID();
        return new Promise((resolve) => {
            Connection((conn) => {
                conn.query(SearchUserInfo, [userId, userId], (err, res) => {
                    if (err) {
                        console.error(err.errno + ' ' + err.message);
                    } else {
                        resolve(res);
                    }
                });
                conn.release();
            });
        });
    }

    updateUserImage = async (user: UserDTO, filePath: string) => {
        const userId = user.getUserID();
        Connection((conn) => {
            conn.query(UpdateUserImage, [filePath, userId, userId]);
            conn.release();
        });
    }

    searchUserData = async (userId: string): Promise<UserType[]> => {
        return new Promise((resolve) => {
            Connection((conn) => {
                conn.query(SearchUserData, [userId, userId], (err, res) => {
                    if (err) {
                        console.error(err.errno + ' ' + err.message);
                    } else {
                        resolve(res);
                    }
                });
                conn.release();
            });
        });
    }
}



export default UserDAO;