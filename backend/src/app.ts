import express, { Request, Response } from 'express';
import { errorMiddleware } from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
const app = express();


const origin = process.env.CLIENT
app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/test', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is up and running',
  });
});

import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js'

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);

app.use(errorMiddleware);

export default app;
