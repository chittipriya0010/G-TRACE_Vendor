import Billing from "../models/billing.model.js";
import Client from "../models/client.model.js";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// Create a new billing associated with a client
export const createBilling = async (req, res) => {
  try {
    const { clientId, billingName, accountNo, gstNo, panNo, billingAddress } = req.body;

    if (!clientId) {
      return res.status(400).json({ message: "clientId is required" });
    }

    // Verify client exists
    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    let poOfficialUrl = null;
    if (req.file) {
      poOfficialUrl = `${BASE_URL}${process.env.PO_UPLOAD_PATH}${req.file.filename}`;
    }

    const billing = await Billing.create({
      clientId,      // associate billing with client
      billingName,
      accountNo,
      gstNo,
      panNo,
      billingAddress,
      poOfficial: poOfficialUrl,
    });

    res.status(201).json({ message: "Billing info saved", billing });
  } catch (err) {
    console.error("Sequelize Error:", err);
    res.status(500).json({ error: "Failed to save billing info", details: err.message });
  }
};

// Get all billings (including client info)
export const getAllBillings = async (req, res) => {
  try {
    const billings = await Billing.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Client,
          attributes: ["id", "companyName", "firstName", "lastName"],
        },
      ],
    });
    res.status(200).json(billings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch billings", details: err.message });
  }
};

// Get billing by ID (including client info)
export const getBillingById = async (req, res) => {
  try {
    const billing = await Billing.findByPk(req.params.id, {
      include: [
        {
          model: Client,
          attributes: ["id", "companyName", "firstName", "lastName"],
        },
      ],
    });
    if (!billing) return res.status(404).json({ message: "Billing not found" });
    res.status(200).json(billing);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch billing", details: err.message });
  }
};