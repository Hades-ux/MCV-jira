import express, { Request, Response } from 'express';
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.get('/test', (req:Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is up and running',
  });
});


import authRouter  from "./routes/auth.route.js"

app.use("/api/v1/auth", authRouter)

app.use(errorMiddleware);

export default app;
