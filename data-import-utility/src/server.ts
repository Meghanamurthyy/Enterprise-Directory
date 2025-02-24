import 'dotenv/config';
import express from 'express';
import path from 'path';
import app from './app';

const port: number = Number(process.env.PORT) || 3000;

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
