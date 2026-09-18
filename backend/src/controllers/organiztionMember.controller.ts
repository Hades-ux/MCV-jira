import { organizationMemberInputDto } from '../dto/requests/organizationMember.dto.js';
import { Types } from 'mongoose';
import {
  addOrganiztionMemberService,
  deleteOrganizationMemberService,
  getOrganizationMemberService,
  updateOrganizationMemberRoleService,
} from '../services/organizationMember.service.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const addOrganiztionMemberController = asyncHandler(async (req, res) => {
  const dto: organizationMemberInputDto = req.body;
  const userId = req.user?._id;
  const { orgId } = req.params;

  if (!userId) throw new ApiError(401, 'Unauthorized');

  if (typeof orgId !== 'string' || !Types.ObjectId.isValid(orgId)) {
    throw new ApiError(400, 'Invalid organization ID');
  }

  const response = await addOrganiztionMemberService(dto, userId, new Types.ObjectId(orgId));

  res.status(201).json(new ApiResponse('Member add successfully', response));
});

export const deleteOrganizationMemberController = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const email = req.body;
  const { orgId } = req.params;

  if (!userId) throw new ApiError(401, 'Unauthorized user');

  if (typeof orgId !== 'string' || !Types.ObjectId.isValid(orgId)) {
    throw new ApiError(400, 'Invalid organization ID');
  }

  await deleteOrganizationMemberService(userId, email, new Types.ObjectId(orgId));

  return res.status(201).json(new ApiResponse('User deleted sucessfully'));
});

export const updateOrganizationMemberController = asyncHandler(async (req, res) => {
  const currentUserId = req.user?._id;
  const { email, role } = req.body;
  const { orgId } = req.params;

  if (!currentUserId) throw new ApiError(401, 'Unauthorized user');

  if (typeof orgId !== 'string' || !Types.ObjectId.isValid(orgId)) {
    throw new ApiError(400, 'Invalid organization ID');
  }

  await updateOrganizationMemberRoleService(currentUserId, email, new Types.ObjectId(orgId), role);

  return res
    .status(200)
    .json(new ApiResponse(`User role update sucessfuly email: ${email}. & New role: ${role}`));
});

export const getOrganizationMemberController = asyncHandler(async (req, res) => {
  const currentUserId = req.user?._id;
  const { orgId } = req.params;

  if (!currentUserId) throw new ApiError(401, 'Unauthorized user');

  if (typeof orgId !== 'string' || !Types.ObjectId.isValid(orgId)) {
    throw new ApiError(400, 'Invalid organization ID');
  }

  const members = await getOrganizationMemberService( new Types.ObjectId(orgId));

  return res
    .status(200)
    .json(
      new ApiResponse(
        members.length === 0 ? 'No members found' : 'Organization members retrieved successfully',
        members,
      ),
    );
});
