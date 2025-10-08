// controllers/fetchVehicleTypeController.js

import VehType from "../models/vehType.model.js";

// CREATE a new vehicle type
export const createVehType = async (req, res) => {
  try {
    const { veh_type } = req.body;
    const newVehType = await VehType.create({ veh_type });
    res.status(201).json(newVehType);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create vehicle type', details: error.message });
  }
};

// GET all vehicle types
export const getAllVehTypes = async (req, res) => {
  try {
    const vehTypes = await VehType.findAll();
    res.status(200).json(vehTypes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicle types', details: error.message });
  }
};

// GET a single vehicle type by ID
export const getVehTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehType = await VehType.findByPk(id);

    if (!vehType) {
      return res.status(404).json({ error: 'Vehicle type not found' });
    }

    res.status(200).json(vehType);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicle type', details: error.message });
  }
};

// UPDATE a vehicle type
export const updateVehType = async (req, res) => {
  try {
    const { id } = req.params;
    const { veh_type } = req.body;

    const vehType = await VehType.findByPk(id);

    if (!vehType) {
      return res.status(404).json({ error: 'Vehicle type not found' });
    }

    vehType.veh_type = veh_type;
    await vehType.save();

    res.status(200).json(vehType);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update vehicle type', details: error.message });
  }
};

// DELETE a vehicle type
export const deleteVehType = async (req, res) => {
  try {
    const { id } = req.params;

    const vehType = await VehType.findByPk(id);

    if (!vehType) {
      return res.status(404).json({ error: 'Vehicle type not found' });
    }

    await vehType.destroy();
    res.status(200).json({ message: 'Vehicle type deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete vehicle type', details: error.message });
  }
};