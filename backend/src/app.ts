import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/test', (req:Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is up and running',
  });
});

export default app;
