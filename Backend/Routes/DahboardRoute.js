import express from "express"
import { verifyToken } from "../Middlewares/VerifyToken.js";
import DashboardLogic from "../Controllers/DashboardLogic.js";

const router = express.Router();

router.get("/" ,verifyToken , DashboardLogic)

export default router