import { Request, Response } from 'express';
import multer, { Multer } from 'multer';
import importService from '../services/import.service';


const upload: Multer = multer({ dest: 'uploads/' });

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

export const uploadFile = async (req: MulterRequest, res: Response) => {
    if (!req.file) return res.status(400).send('No file uploaded');

    try {
        const result = await importService.processFile(req.file.path);
        res.json({ message: 'Data imported successfully', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error inserting data' });
    }
};

export const getStatus = (req: Request, res: Response) => {
    res.send('✅ API is running...');
};

export const uploadMiddleware = upload.single('file'); // Middleware for file upload
