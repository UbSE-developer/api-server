import path from 'path';
import fs from 'fs';
import fileMng from 'multer';

const storage = fileMng.diskStorage({
    destination: (req, file, cb) => {  // 파일이 업로드될 경로 설정
		cb(null, 'uploads/')
	},
	filename: (req, file, cb) => {	// timestamp를 이용해 새로운 파일명 설정
		let newFileName = new Date().valueOf() + path.extname(file.originalname)
		cb(null, newFileName)
	},
});

const uploadMng = fileMng({ storage: storage })

export const fileRemove = (filePath: string) => {
    fs.rmSync(filePath, {recursive: true, force: true});
};

export default uploadMng;