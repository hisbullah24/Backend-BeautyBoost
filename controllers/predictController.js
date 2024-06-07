import Predict from "../models/predictModel.js";
import path from "path";
import fs from "fs";

export const postPredict = async(req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const name =req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg: "Invalid Image"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try{
            await Predict.create({name: name, image: fileName, url: url});
            res.status(201).json({msg: "Predict Successfully"});
        }catch (error) {
            console.log(error.message);
        }
    })

}

export const getPredict = async(req, res)=>{
    try {
        const response = await Predict.findAll();
        res.json(response);
    } catch (error){
        console.log(error.message);
    }
}

export const getPredictById = async(req, res)=>{
    try {
        const response = await Predict.findOne({
            where: {
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error){
        console.log(error.message);
    }
}

export const deletePredict = async(req, res)=>{
        const predict = await Predict.findOne({
            where: {
                id : req.params.id
            }
        });
        if(!predict) return res.status(404).json({msg: "No Data Found"});
        try {
            const filepath = `./public/images/${predict.image}`;
            fs.unlinkSync(filepath);
            await Predict.destroy({
                where:{
                id: req.params.id
                }
            });
            res.status(200).json({msg: "Predict Deleted Successfully"});    
        } catch (error) {
            console.log(error.message);
        }
}