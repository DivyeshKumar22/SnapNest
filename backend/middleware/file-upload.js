import multer from "multer";
import { v1 as uuidv1 } from 'uuid';


const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg',
};

const fileUpload=multer({
    limits:500000,
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'uploads/images');
        },
        filename:(req,file,cb)=>{
            const ext=MIME_TYPE_MAP[file.mimetype]
            cb(null,uuidv1()+'.'+ext)
        }
    }),
    fileFilter:(req,file,cb)=>{
        const isvalid=!!MIME_TYPE_MAP[file.mimetype]
        let error=isvalid?null:new Error('Invalid mime type!');
        cb(error,isvalid);

    }
});

export default fileUpload;