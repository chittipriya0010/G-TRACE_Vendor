import Client from "../models/client.model.js";

// Create new client
export const createClient = async (req, res) => {
  try {
    // Parse from header and validate immediately
    const salesId = parseInt(req.headers['x-user-id']);
    const branchId = parseInt(req.headers['x-branch-id']);

    if (!salesId || !branchId || isNaN(salesId) || isNaN(branchId)) {
      return res.status(400).json({ message: "Missing or invalid salesId or branchId in headers." });
    }

    // Collect other fields from req.body
    const {
      firstName, lastName, emailAddress,
      mobileNumber, companyName, state,
      address
    } = req.body;

    // Create the client using these values
    const client = await Client.create({
      salesId,
      branchId,
      firstName,
      lastName,
      emailAddress,
      mobileNumber,
      companyName,
      state,
      address
    });

    res.status(201).json({ message: "Client created successfully", client });
  } catch (err) {
    console.error("Sequelize Error:", err);
    res.status(500).json({ error: "Failed to create client", details: err.message });
  }
};

// Get all clients
export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll({ order: [["createdAt", "DESC"]] });
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch clients", details: err.message });
  }
};

// Get client by ID
export const getClientById = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch client", details: err.message });
  }
};