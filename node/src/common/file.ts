import path from 'path';
import fs from 'fs';
import fileMng from 'multer';

export const UploadFile = fileMng({
	storage: fileMng.diskStorage({
			destination: function(req, file, cb) {
					cb(null, 'uploads/');
			},
			filename: function(req, file, cb) {
					cb(null, new Date().valueOf() + '-' + file.originalname);
			},
	}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpeg" || ".png" || ".jpg") {
      return cb(null, true);
    }
    cb(null, false);
  },
	limits: { fileSize: 20 * 1024 * 1024 },
});

export const fileRemove = (filePath: string) => {
  if (fs.existsSync(filePath)) {
		fs.rmSync(filePath, {recursive: true, force: true});
	}
};