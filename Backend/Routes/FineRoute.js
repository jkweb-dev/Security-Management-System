import express from "express"
import { verifyToken } from "../Middlewares/VerifyToken.js";
import { FineLogicPostAndPut } from "../Controllers/FineLogic.js";
import { getAllFines } from "../Controllers/fineLogic2.js";
import { deleteFine } from "../Controllers/FineLogic3.js";
import { updateFine } from "../Controllers/Finelogic4.js";




const router = express.Router();

router.post("/addFineOrUpdate" ,verifyToken ,FineLogicPostAndPut)
router.get("/getFines" ,verifyToken ,getAllFines)
router.put("/updateFine/:idi" ,verifyToken ,updateFine)
router.delete("/deleteFine/:id" ,verifyToken ,deleteFine)



export default router