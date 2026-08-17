import { OrganizationInputDto } from '../dto/requests/organization.dto.js';
import {
  createOrganizationService,
  updateOrganizationService,
} from '../services/organization.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

export const createOrganiztionController = asyncHandler(async (req, res) => {
  const avatar = req.file?.path;
  const userId = req.user?._id;
  const dto: OrganizationInputDto = req.body;

  if (!avatar) throw new ApiError(400, 'Avatar file is required');

  if (!userId) throw new ApiError(401, 'Unauthorized');

  const response = await createOrganizationService(dto, userId, avatar);

  res.status(201).json(new ApiResponse('Organization created successfully', response));
});

export const updateOrganizationController = asyncHandler(async (req, res) => {
  const {name} = req.body || '';
  const userId = req.user?._id;
  const path = req.file?.path || '';
  const { orgId } = req.params;
  if (!userId) throw new ApiError(401, 'Unauthorized');

  const response = await updateOrganizationService(userId, orgId.toString(), name, path);

  return res.status(201).json(new ApiResponse('Data update successfully', response));
});

export const deleteOrganizartionController = asyncHandler(async (req, res) => {});
