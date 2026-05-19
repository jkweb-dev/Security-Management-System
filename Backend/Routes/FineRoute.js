import express from "express"
import { verifyToken } from "../Middlewares/VerifyToken.js";
import { FineLogicPostAndPut } from "../Controllers/FineLogic.js";
import { getAllFines } from "../Controllers/fineLogic2.js";
import { deleteFine } from "../Controllers/FineLogic3.js";




const router = express.Router();

router.post("/addFineOrUpdate" ,verifyToken ,FineLogicPostAndPut)
router.get("/getFines" ,verifyToken ,getAllFines)
router.delete("/deleteFine/:id" ,verifyToken ,deleteFine)



export default router