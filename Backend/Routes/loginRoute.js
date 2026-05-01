import express from "express"
import loginLogic from "../Controllers/loginLogic.js";

const router = express.Router();

router.post("/" ,loginLogic)

export default router