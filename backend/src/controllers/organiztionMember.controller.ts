import { organizationMemberInputDto } from '../dto/requests/organizationMember.dto.js';
import OrganizationMember from "../models/organizationMember.model.js";
import { addOrganiztionMemberService } from '../services/organizationMember.service.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const addOrganiztionMemberController = asyncHandler(async (req, res) => {
  const dto: organizationMemberInputDto = req.body;
  const userId = req.user?._id;

  if (!userId) throw new ApiError(401, 'Unauthorized');

  const isExist = await OrganizationMember.findOne({userId, isDeleted:false}).populate("organizationId")
  if (!isExist) throw new ApiError(401, 'Unauthorized org');

  const orgId = isExist.organizationId
  console.log("orgId: ", orgId)

  const response = await addOrganiztionMemberService(dto, userId, orgId);

  res.status(201).json(new ApiResponse('Member add successfully', response));
});
