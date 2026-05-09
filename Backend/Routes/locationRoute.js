import express from "express"
import { createAssignment } from "../Controllers/LocationAssignmentLogic.js"
import { getAssignmentsByDateShift } from "../Controllers/getAssignments.js"
import { verifyToken } from "../Middlewares/VerifyToken.js"
import { locations } from "../Controllers/ZoneLocations.js"


const router = express.Router()

router.post("/assignLocation" ,verifyToken , createAssignment)
router.get("/getAssignments" ,verifyToken , getAssignmentsByDateShift)
router.get("/getLocations" ,verifyToken , locations)

export default router