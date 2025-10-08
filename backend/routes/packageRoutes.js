import express from "express";
import { 
    createPackage, 
    getPackages, 
    getPackageById, 
    getSolutionTypes, 
    getTeams, 
    updatePackage, 
    packageEventsHandler 
} from "../controllers/packageController.js";

const router = express.Router();

// Routes

// 1. Static/Specific Routes (Must come first!)
router.get("/packages/solution-types", getSolutionTypes);
router.get("/packages/teams", getTeams);
router.get("/packages/events", packageEventsHandler); // SSE must also be above the dynamic ID

// 2. Base CRUD Routes
router.post("/packages", createPackage);
router.get("/packages", getPackages);

// 3. Dynamic Routes (Must come last to prevent them from "stealing" the specific routes above)
router.get("/packages/:id", getPackageById);
router.patch("/packages/:id/status", updatePackage); // Update by ID, specific action
router.patch("/packages/:id", updatePackage);       // General update by ID

export default router;