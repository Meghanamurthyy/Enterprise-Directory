import express from 'express';
import { getStatus, uploadFile, uploadMiddleware } from '../controllers/api.controller';

const router = express.Router();

router.get('/', getStatus);
router.post('/upload', uploadMiddleware, async (req, res, next) => {
    try {
        await uploadFile(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
