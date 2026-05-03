import express from "express"
import { verifyToken } from "../Middlewares/VerifyToken.js";
import { uploadGuardFiles } from "../Middlewares/guardFilesUpload.js";
import { createGuard } from "../Controllers/AddGuardLogic.js";


const router = express.Router();

router.post("/" ,verifyToken , uploadGuardFiles , createGuard)

export default router