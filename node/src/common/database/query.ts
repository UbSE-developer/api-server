export const ExistUserCheck = 'SELECT COUNT(user_id) AS exist_check FROM INS_USER WHERE user_id = ?';

export const UserInsert = 'INSERT INTO INS_USER(name, password, user_id, user_auth, salt)';

export const Login = '';

export const UserUpdate = '';