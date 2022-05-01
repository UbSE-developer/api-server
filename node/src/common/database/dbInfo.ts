import 'dotenv/config';
import * as db from 'mysql';
import * as common from '../const';

type myDBCallback = (connection :db.PoolConnection) => void;

const ConnectionPool = db.createPool({
    host: 'localhost',
    port: Number(common.DATABASE_PORT),
    user: common.DATABASE_USER,
    password: common.DATABASE_PASSWORD,
    database: common.DATABASE_NAME,
    multipleStatements: true,
});

console.log(common.DATABASE_HOST);

export const Connection = (callback: myDBCallback) => {
    ConnectionPool.getConnection((err, conn) => {
        if (!err) {
            callback(conn);
        } else {
            console.error(err);
        }
    });
};
