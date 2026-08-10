import { organizationMemberInputDto } from '../dto/requests/organizationMember.dto.js';
import organizationMember from '../models/organizationMember.model.js';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

// Add member
export const addOrganiztionMemberService = async (
  dto: organizationMemberInputDto,
  userId: string,
  organizationId: string,
) => {
  //checking login user is authorized
  const currentUser = await User.exists({ _id: userId });
  if (!currentUser) throw new ApiError(401, 'Unauthorized user');

  const normalizedEmail = dto.email.trim().toLowerCase();
  if (!normalizedEmail) throw new ApiError(404, 'Email is required');

  const isExist = await User.findOne({ email: normalizedEmail }).select("email");
  if (!isExist) throw new ApiError(404, 'User not found');

  if (!dto.role) throw new ApiError(404, 'Member role is required');

  const memberData = {
    userId: isExist._id,
    organizationId: organizationId,
    role: dto.role,
    invitedBy: userId,
  };

  const response = await organizationMember.create(memberData);

  return response;
};
// Remove member
// Update member role
// List organization members
