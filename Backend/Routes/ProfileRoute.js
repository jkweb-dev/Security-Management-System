import express from "express"
import { ProfileLogic } from "../Controllers/profileLogic.js";
import { verifyToken } from "../Middlewares/VerifyToken.js";
import { updateGuard } from "../Controllers/UpdateGuard.js";
import { uploadGuardFiles } from "../Middlewares/guardFilesUpload.js";
import { deleteGuard } from "../Controllers/deleteProfile.js";

const router = express.Router({mergeParams : true});

router.get("/" , verifyToken ,ProfileLogic)
router.put("/" , verifyToken ,uploadGuardFiles , updateGuard)
router.delete("/" , verifyToken ,deleteGuard)

export default router