import express from "express"
import { verifyToken } from "../Middlewares/VerifyToken.js";
import { saveAttendance } from "../Controllers/AttendenceLogic.js";

const router = express.Router();

router.post("/save" ,verifyToken ,saveAttendance )

export default router