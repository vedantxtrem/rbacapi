import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/ping', (_req, res) => {
    res.send('Pong');
});

export default app;