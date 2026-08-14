import { Types } from 'mongoose';
import { organizationMemberInputDto } from '../dto/requests/organizationMember.dto.js';
import OrganizationMember, { RoleTypes } from '../models/organizationMember.model.js';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

// Add member
export const addOrganiztionMemberService = async (
  dto: organizationMemberInputDto,
  userId: string,
  orgId: Types.ObjectId,
) => {
  const normalizedEmail = dto.email.trim().toLowerCase();
  if (!normalizedEmail) throw new ApiError(400, 'Email is required');

  if (!dto.role) throw new ApiError(400, 'Member role is required');

  //checking user Exist or not
  const currentUser = await User.exists({ _id: userId });
  if (!currentUser) throw new ApiError(401, 'User not found');

  // checking for current user authorization leve
  const isMember = await OrganizationMember.findOne({userId:userId, isDeleted:false});
  if(!isMember) throw new ApiError(400,"Unauthorized action");

  if(isMember.role !== RoleTypes.owner) throw new ApiError(400,"Unauthorized leve is low");

  // Check target user exists
  const isExist = await User.findOne({ email: normalizedEmail }).select('email');
  if (!isExist) throw new ApiError(404, 'User not found');

  // checking for already member
  const existingMember = await OrganizationMember.findOne({
    userId: isExist?._id,
    isDeleted: false,
  });

  if (existingMember) {
    if (existingMember.organizationId.equals(isMember.organizationId)) {
      throw new ApiError(409, 'Already a member of this organization');
    }

    throw new ApiError(409, 'User is already a member of another organization');
  }

  // dto for member bata
  const memberData = {
    userId: isExist._id,
    organizationId: orgId,
    role: dto.role as RoleTypes,
    invitedBy: userId,
  };

  // create the member
  const response = await OrganizationMember.create(memberData);

  // return response
  return response;
};

// Remove member
export const deleteOrganizationMemberService = async (userId: string, email: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) throw new ApiError(400, 'Email is required');

  if (!userId) throw new ApiError(401, 'Unauthorized user');

  const currentUser = await User.findOne({ _id: userId }).select('-password');
  if (!currentUser) throw new ApiError(404, 'User not found');

  const isMember = await OrganizationMember.findOne({ userId, isDeleted: false });

  if (!isMember) throw new ApiError(400, 'Not a member');

  if (isMember?.role === RoleTypes.owner) {
    isMember.isDeleted = true;
    return;
  } else {
    throw new ApiError(401, 'You are not authorized to do that');
  }
};
// Update member role
export const updateOrganizationMemberRole = async () => {};
// List organization members
export const getOrganizationMemberService = async (userId: string) => {
  if (!userId) throw new ApiError(401, 'Unauthorized user');

  const currentUser = await User.findOne({ _id: userId }).select('-password');
  if (!currentUser) throw new ApiError(404, 'User not found');

  const isMember = await OrganizationMember.findOne({ userId, isDeleted: false });

  const getAll = await OrganizationMember.find({
    organizationId: isMember?.organizationId,
  }).populate('userId');

  return getAll;
};
