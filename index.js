import express from "express";
import db from "./config/Database.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import predictRoute from "../ExpressJS-API/routes/predictRoute.js";

const app = express();

try {
    await db.authenticate();
    console.log('Database Connected ...');
} catch (error) {
    console.log(error);
}

app.use(userRoute);
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(predictRoute);

app.listen(5000, ()=> console.log('Server Up and Running...'));