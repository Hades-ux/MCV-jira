import { OrganizationInputDto } from '../dto/requests/organization.dto.js';
import { createOrganizationService } from '../services/organization.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

export const createOrganiztionCntoller = asyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const dto: OrganizationInputDto = req.body;
  const path = req.file?.path;

  if (!path) {
    throw new ApiError(400, 'Avatar file is required');
  }

  if (!userId) {
    throw new ApiError(401, 'Unauthorized');
  }

  await createOrganizationService(dto, userId, path);
});
