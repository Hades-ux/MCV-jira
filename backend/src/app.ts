import express, { Request, Response } from 'express';
import { errorMiddleware } from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

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

app.use('/api/v1/auth', authRouter);

app.use(errorMiddleware);

export default app;
