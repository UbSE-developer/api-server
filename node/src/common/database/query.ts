export const ExistUserCheck = 'SELECT COUNT(user_id) AS exist_check FROM INS_USER WHERE user_id = ? OR user_auth = ?';

export const UserInsert = 'INSERT INTO INS_USER(name, password, user_id, user_auth, salt, state)';

export const SearchUserInfo = 'SELECT user_id, user_auth, name, salt, password as hash_pass \
                              FROM INS_USER \
                              WHERE user_id = ? OR user_auth = ?';

export const UpdateUserImage = 'UPDATE INS_USER SET image = ? WHERE user_id = ? OR user_auth = ?';

export const SearchUserData = 'SELECT name, user_id, introduction, user_auth, sex, image, state \
                              FROM INS_USER \
                              WHERE user_id = ? OR user_auth = ?';

export const UserUpdate = 'UPDATE INS_USER \
                          SET name = ?, password = ?, salt = ?, sex = ?, introduction = ? \
                          WHERE user_id = ? OR user_auth = ?';