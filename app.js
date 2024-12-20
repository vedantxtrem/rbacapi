import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import bodyParser from 'body-parser';

dotenv.config({
    path: './.env'
  });

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// app.use(cors({}));
app.use(cors({
  origin: "https://vrv-rbac.vercel.app",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));
// app.use(cors({
//   origin: ["http://localhost:5173","*"],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
// }));



app.use("/api/v1/user",userRouter);
app.use('/api/v1/upload', uploadRoutes);

app.get('/ping', (_req, res) => {
    res.send('Pong');
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

export default app;