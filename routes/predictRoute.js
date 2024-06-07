import express from "express";
import{
    postPredict,
    getPredict,
    getPredictById,
    deletePredict
} from "../controllers/predictController.js";

const router = express.Router();

router.post('/predict', postPredict);
router.get('/predict', getPredict);
router.get('/predict/:id', getPredictById);
router.delete('/predict/:id', deletePredict);

export default router;