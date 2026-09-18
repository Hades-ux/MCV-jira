import { organizationMemberInputDto } from '../dto/requests/organizationMember.dto.js';
import { Types } from 'mongoose';
import {
  addOrganiztionMemberService,
  deleteOrganizationMemberService,
  getOrganizationMemberService,
} from '../services/organizationMember.service.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const addOrganiztionMemberController = asyncHandler(async (req, res) => {
  const dto: organizationMemberInputDto = req.body;
  const userId = req.user?._id;

  if (!userId) throw new ApiError(401, 'Unauthorized');

  const { orgId } = req.params;

  if (typeof orgId !== 'string' || !Types.ObjectId.isValid(orgId)) {
    throw new ApiError(400, 'Invalid organization ID');
  }

  const response = await addOrganiztionMemberService(dto, userId, new Types.ObjectId(orgId));

  res.status(201).json(new ApiResponse('Member add successfully', response));
});

export const deleteOrganizationMemberController = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const email = req.body;

  if (!userId) throw new ApiError(401, 'Unauthorized user');

  const { orgId } = req.params;

  if (typeof orgId !== 'string' || !Types.ObjectId.isValid(orgId)) {
    throw new ApiError(400, 'Invalid organization ID');
  }

  await deleteOrganizationMemberService(userId, email, new Types.ObjectId(orgId));

  return res.status(201).json(new ApiResponse('User deleted sucessfully'));
});

export const updateOrganizationMemberController = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const email = req.body;

  if (!userId) throw new ApiError(401, 'Unauthorized user');
});

export const getOrganizationMemberController = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { orgId } = req.params;

  if (!userId) throw new ApiError(401, 'Unauthorized user');

  const response = await getOrganizationMemberService(userId, orgId.toString());

  return res.status(200).json(new ApiResponse('Data found', response));
});
