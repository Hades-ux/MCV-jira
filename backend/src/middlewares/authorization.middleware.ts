import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError.js';
import { hasPermission } from '../utils/permission.js';
import OrganizationMember from '../models/organizationMember.model.js';

export const requirePermission = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const {orgId} = req.params;

    if (!userId) throw new ApiError(401, 'Unauthorized MD');
    if (!orgId) throw new ApiError(400, 'Organization ID is required');

    const isMember = await OrganizationMember.findOne({ userId, organizationId: orgId }).select(
      'role',
    );

    if (!isMember) throw new ApiError(403, 'Not a member of any organization');

    const role = isMember.role;

    if (!hasPermission(role, permission)) {
      throw new ApiError(403, 'Forbidden');
    }

    next();
  };
};
