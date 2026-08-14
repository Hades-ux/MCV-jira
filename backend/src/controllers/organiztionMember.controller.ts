import { organizationMemberInputDto } from '../dto/requests/organizationMember.dto.js';
import OrganizationMember from '../models/organizationMember.model.js';
import { addOrganiztionMemberService, deleteOrganizationMemberService } from '../services/organizationMember.service.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const addOrganiztionMemberController = asyncHandler(async (req, res) => {
  const dto: organizationMemberInputDto = req.body;
  const userId = req.user?._id;

  if (!userId) throw new ApiError(401, 'Unauthorized');

  const isExist = await OrganizationMember.findOne({ userId, isDeleted: false });

  if (!isExist) throw new ApiError(401, 'Unauthorized org');

  const orgId = isExist.organizationId._id;

  const response = await addOrganiztionMemberService(dto, userId, orgId);

  res.status(201).json(new ApiResponse('Member add successfully', response));
});

export const deleteOrganizationMemberController = asyncHandler(async (req, res) => {
const userId = req.user?._id;
const email = req.body

if(!userId) throw new ApiError(401, "Unauthorized user")

  const user = await deleteOrganizationMemberService(userId, email);

  return res.status(201).json({user})
  
});
