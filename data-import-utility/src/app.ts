import express, { Application } from 'express';
import cors from 'cors';
import apiRouter from './routes/api.router';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static('public'));

// API routes
app.use('/api', apiRouter);

export default app;
