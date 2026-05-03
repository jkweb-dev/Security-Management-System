import express from "express"
import { verifyToken } from "../Middlewares/VerifyToken.js";
import { getAllGuards } from "../Controllers/GuardsLogic.js";

const router = express.Router();

router.get("/" ,verifyToken , getAllGuards )

export default router