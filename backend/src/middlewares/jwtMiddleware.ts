import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/ApiError.js';

interface AccessTokenPayload extends JwtPayload {
  _id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}

export const jwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new ApiError(401, 'Unauthorized');
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    if (!accessTokenSecret) {
      throw new Error('ACCESS_TOKEN_SECRET is not configured');
    }

    const decoded = jwt.verify(
      token,
      accessTokenSecret,
    ) as AccessTokenPayload;

    if (!decoded._id) {
      throw new ApiError(401, 'Invalid token payload');
    }

    req.user = decoded;

    next();
  } catch {
    throw new ApiError(401, 'Unauthorized');
  }
};