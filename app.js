import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';

dotenv.config({
    path: './.env'
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/v1/user",userRouter);

app.get('/ping', (_req, res) => {
    res.send('Pong');
});

export default app;