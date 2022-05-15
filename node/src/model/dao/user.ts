import { Connection } from "../../common/database/dbInfo";
import { ExistUserCheck, UserInsert } from "../../common/database/query";
import UserDTO from "../dto/user";
import { ExistCheckType } from "../type/response/user";
import { UserType } from "../type/user";

class UserDAO { // Database Access Object

    // TODO
    // Promise Architecture modify!!!
    checkUser = async (userID: string): Promise<ExistCheckType[]> => {
        return new Promise((resolve) => {
            Connection((conn) => {
                conn.query(ExistUserCheck, [userID], (err, res) => {
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
        const userInsertQuery = `${UserInsert} VALUES ('${user.getName()}', '${user.getPassword()}', '${user.getUserID()}', '${user.getUserAuth()}', '${user.getSalt()}')`;
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
    }
}

export default UserDAO;