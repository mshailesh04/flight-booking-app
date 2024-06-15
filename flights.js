import express from "express";
const router = express.Router();
import { createFlight, getFlights, getFlight, updateFlight, deleteFlight, countByCity, countByType } from "../controllers/flight.js";
import { verifyAdmin } from "../utils/verifyToken.js";

//Create
router.post("/", verifyAdmin, createFlight);

//Update
router.put("/:id", verifyAdmin, updateFlight);

//Delete
router.delete("/:id",verifyAdmin, deleteFlight);

//Get
router.get("/find/:id", getFlight);
 
// Get All  
router.get("/", getFlights);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;

