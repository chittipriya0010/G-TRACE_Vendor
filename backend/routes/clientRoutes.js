import express from "express";
import { createClient, getAllClients, getClientById } from "../controllers/clientController.js";

const router = express.Router();

router.post("/clients", createClient);
router.get("/clients", getAllClients);
router.get("/clients/:id", getClientById);

export default router;