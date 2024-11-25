import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import bodyParser from 'body-parser';

dotenv.config({
    path: './.env'
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors({}));
app.use(cors({
  origin: "https://rbac-frontend-kappa.vercel.app",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));
// app.use(cors({
//   origin: ["http://localhost:5173","*"],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
// }));

app.use(bodyParser.json({ limit: "10mb" }));

app.use("/api/v1/user",userRouter);

app.get('/ping', (_req, res) => {
    res.send('Pong');
});

export default app;