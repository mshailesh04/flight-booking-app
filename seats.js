import express from "express"
import { createSeat, getSeats, getSeat, updateSeat, deleteSeat } from "../controllers/seat.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/:flightid", verifyAdmin, createSeat);

//Update
router.put("/:id", verifyAdmin, updateSeat);

//Delete
router.delete("/:id/:flightid",verifyAdmin, deleteSeat);

//Get
router.get("/:id", getSeat);
 
// Get All
router.get("/", getSeats);


export default router;