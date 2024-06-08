import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./config/Database.js";
import fileUpload from "express-fileupload";
import userRoute from "./routes/userRoute.js";
import predictRoute from "../ExpressJS-API/routes/predictRoute.js";

dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log('Database Connected ...');
} catch (error) {
    console.error(error);
}

app.use(cookieParser());
app.use(cors({ credentials:true }));
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(userRoute);
app.use(predictRoute);

app.listen(5000, ()=> console.log('Server Up and Running on port 5000'));