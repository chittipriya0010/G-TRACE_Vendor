// routes/fetchVehTypeRoutes.js
import express from 'express';
import {
  createVehType,
  getAllVehTypes,
  getVehTypeById,
  updateVehType,
  deleteVehType,
} from '../controllers/fetchVehicleTypeController.js';

const router = express.Router();

router.post('/vehicles', createVehType);
router.get('/vehicles', getAllVehTypes);
router.get('/vehicles/:id', getVehTypeById);
router.put('/vehicles/:id', updateVehType);
router.delete('/vehicles/:id', deleteVehType);

export default router;