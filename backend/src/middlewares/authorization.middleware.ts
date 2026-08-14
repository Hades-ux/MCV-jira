import { Request, Response, NextFunction } from 'express';
import ApiError from "../utils/ApiError.js";
import { hasPermission } from '../utils/permission.js';

export const requirePermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;

    if (!hasPermission(role, permission)) {
      throw new ApiError(403, 'Forbidden');
    }

    next();
  };
};