import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import routes from './Routes/routes.js'
import apiErrorHandler from './middleware/error-middleware.js'
import multerUpload from 'multer'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()

const fileStorageEngine = multerUpload.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); //important this is a direct path fron our current file to storage location
  },
  filename: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) 
          cb(new Error('Only image are allowed.'), false);
        cb(null, Date.now() + " " + file.originalname);
    }
});

const maxUploadSize = 5 * 1024 * 1024
const upload = multerUpload({storage:fileStorageEngine, limits: maxUploadSize})

const PORT = process.env.PORT || 5000

const startExpressServer = async () =>{
	try {
		await mongoose.connect(process.env.MONGO_URL)
		const app = express()
		app.listen(PORT,()=>{
			console.log(`Express server started on port ${PORT}`.toUpperCase());
			console.log();
		})
		app.use(helmet())
		app.use(cors({
			origin: process.env.CLIENT_URL,
			credentials: true
		}))
		app.use(express.urlencoded({ extended: true, limit: '5mb', parameterLimit: 100000 }));
		app.use(express.json()) // чтобы читать JSON
		app.use(cookieParser())
		app.use(express.static(`${__dirname}/uploads`))
		app.use('/api', routes)

		app.post("/upload", upload.single('file'), async function (req, res, next) {
			let filedata = req.file;
			if(!filedata)
				res.send("Ошибка при загрузке файла");
			else
				res.send("Файл загружен");
		})

		app.use(apiErrorHandler)
		
	} catch (error) {
		console.log(error);
	}
}
startExpressServer()