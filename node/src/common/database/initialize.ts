import { Connection } from "./dbInfo";

const DROP_USER_TB = 'DROP TABLE IF EXISTS INS_USER;';
const DROP_BOARD_TB = 'DROP TABLE IF EXISTS INS_BOARD;';
const DROP_REPLY_TB = 'DROP TABLE IF EXISTS INS_REPLY; ';
const DROP_BOARD_LIKE = 'DROP TABLE IF EXISTS INS_BOARD_LIKE; ';
const DROP_FOLLOWER = 'DROP TABLE IF EXISTS INS_FOLLOWER; ';
const DROP_ALARM = 'DROP TABLE IF EXISTS INS_ALARM; ';

const CREATE_USER_TB = 'CREATE TABLE INS_USER ( \
                        name          VARCHAR(20) NOT NULL, \
                        password      VARCHAR(250) NOT NULL, \
                        user_id       VARCHAR(20) NOT NULL, \
                        introduction  VARCHAR(250), \
                        user_auth     VARCHAR(50) NOT NULL, \
                        sex           VARCHAR(1), \
                        salt          VARCHAR(500) NOT NULL, \
                        image         VARCHAR(50), \
                        state         INT(1) NOT NULL, \
                        PRIMARY KEY(user_id));';

const CREATE_BOARD_TB = 'CREATE TABLE INS_BOARD ( \
                        user_id       VARCHAR(20) NOT NULL, \
                        board_idx     VARCHAR(50) NOT NULL, \
                        image         VARCHAR(1000) NOT NULL, \
                        content       VARCHAR(2000) NOT NULL, \
                        create_time   VARCHAR(100) NOT NULL, \
                        update_time   VARCHAR(100) NOT NULL, \
                        CONSTRAINT user_board_constraint1 FOREIGN KEY(user_id) REFERENCES INS_USER(user_id) ON UPDATE CASCADE ON DELETE NO ACTION, \
                        PRIMARY KEY(board_idx));';

const CREATE_REPLY_TB = 'CREATE TABLE INS_REPLY (  \
                        board_idx      VARCHAR(50) NOT NULL, \
                        user_id        VARCHAR(20) NOT NULL, \
                        reply_idx      VARCHAR(50) NOT NULL, \
                        reply_contents VARCHAR(255) NOT NULL, \
                        create_time    VARCHAR(100) NOT NULL, \
                        update_time    VARCHAR(100) NOT NULL, \
                        CONSTRAINT user_reply_constraint1 FOREIGN KEY(board_idx) REFERENCES INS_BOARD(board_idx) ON UPDATE CASCADE ON DELETE CASCADE, \
                        CONSTRAINT user_reply_constraint2 FOREIGN KEY(user_id) REFERENCES INS_USER(user_id) ON UPDATE CASCADE ON DELETE NO ACTION, \
                        PRIMARY KEY(board_idx, reply_idx));';

const CREATE_BOARD_LIKE_TB = 'CREATE TABLE INS_BOARD_LIKE ( \
                            board_idx VARCHAR(50) NOT NULL, \
                            user_id VARCHAR(20) NOT NULL, \
                            CONSTRAINT board_like_constraint1 FOREIGN KEY(board_idx) REFERENCES INS_BOARD(board_idx) ON UPDATE CASCADE ON DELETE CASCADE, \
                            CONSTRAINT board_like_constraint2 FOREIGN KEY(user_id) REFERENCES INS_USER(user_id) ON UPDATE CASCADE ON DELETE NO ACTION, \
                            PRIMARY KEY(board_idx, user_id));';

const CREATE_BOARD_follower = 'CREATE TABLE INS_FOLLOWER ( \
                            follower_id VARCHAR(20) NOT NULL, \
                            follow_id VARCHAR(20) NOT NULL, \
                            CONSTRAINT user_follower_constraint1 FOREIGN KEY(follower_id) REFERENCES INS_USER(user_id) ON UPDATE CASCADE ON DELETE NO ACTION, \
                            CONSTRAINT user_follower_constraint2 FOREIGN KEY(follow_id) REFERENCES INS_USER(user_id) ON UPDATE CASCADE ON DELETE NO ACTION, \
                            PRIMARY KEY(follower_id, follow_id));';

const CRATE_ALARM_TB = 'CREATE TABLE INS_ALARM ( \
                        target_id VARCHAR(20) NOT NULL, \
                        sender_id VARCHAR(20) NOT NULL, \
                        contents    VARCHAR(200) NOT NULL, \
                        state       VARCHAR(1) NOT NULL, \
                        board_idx   VARCHAR(50) NOT NULL, \
                        create_time VARCHAR(100) NOT NULL, \
                        PRIMARY KEY(target_id, sender_id, create_time));';

const query = DROP_REPLY_TB + DROP_BOARD_LIKE + DROP_FOLLOWER + DROP_ALARM + DROP_BOARD_TB + DROP_USER_TB
    + CREATE_USER_TB + CREATE_BOARD_TB + CREATE_REPLY_TB + CREATE_BOARD_LIKE_TB + CREATE_BOARD_follower + CRATE_ALARM_TB;

Connection((conn) => {
    conn.query(query, [], (err) => {
        if (err) {
            console.error(err.errno + ' ' + err.message);
        } else {
            console.log('Success');
        }
    });
    conn.release();
});
