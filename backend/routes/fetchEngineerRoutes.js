import { Router } from 'express';
import { getEngineersList } from '../controllers/fetchEngineerController.js';

const router = Router();

router.get('/engineers', getEngineersList);

export default router;
