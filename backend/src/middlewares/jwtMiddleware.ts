import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/ApiError.js';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

 export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) throw new ApiError(401, 'Unauthorized Access');

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;

    req.user = decode;

    next();
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired token');
  }
};
