import express from "express";
// import {
//   createInstallation,
//   getInstallations,
//   getInstallationById,
//   updateInstallation,
//   deleteInstallation,
// } from "../controllers/installation.controller.js";

import { createInstallation, getInstallations, getInstallationById, updateInstallation, deleteInstallation, adminUpdateInstallation } from "../controllers/installationController.js";


const router = express.Router();

router.post("/installations", createInstallation);
router.get("/installations", getInstallations);
router.get("/installations/:job_id", getInstallationById);
router.put("/installations/:id", updateInstallation);
router.delete("/installations/:job_id", deleteInstallation);
router.put("/installations/admin/:job_id", adminUpdateInstallation);

export default router;