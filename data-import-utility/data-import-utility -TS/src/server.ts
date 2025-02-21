import 'dotenv/config';
import app from './app';

const port: number = Number(process.env.PORT) || 3000;

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
