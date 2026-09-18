import { Types } from 'mongoose';
import { organizationMemberInputDto } from '../dto/requests/organizationMember.dto.js';
import OrganizationMember, { RoleTypes } from '../models/organizationMember.model.js';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import { error } from 'node:console';

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
  const currentUserMembership = await OrganizationMember.findOne({
    userId: userId,
    organizationId: orgId,
    isDeleted: false,
  });
  if (!currentUserMembership) throw new ApiError(403, 'Unauthorized action');

  if (currentUserMembership.role !== RoleTypes.owner)
    throw new ApiError(403, 'Insufficient permission');

  // Check target user exists
  const targetUser = await User.findOne({ email: normalizedEmail }).select('-password');
  if (!targetUser) throw new ApiError(404, 'User not found');

  // checking for already member ant org
  const existingMember = await OrganizationMember.findOne({
    userId: targetUser?._id,
    isDeleted: false,
  });

  if (existingMember) {
    if (existingMember.organizationId.equals(orgId)) {
      throw new ApiError(409, 'Already a member of this organization');
    }

    throw new ApiError(409, 'User is already a member of another organization');
  }

  // dto for member bata
  const memberData = {
    userId: targetUser._id,
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
export const deleteOrganizationMemberService = async (
  userId: string,
  email: string,
  orgId: Types.ObjectId,
): Promise<void> => {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) throw new ApiError(400, 'Email is required');

  if (!userId) throw new ApiError(401, 'Unauthorized user');

  //checking user Exist or not
  const currentUser = await User.exists({ _id: userId });
  if (!currentUser) throw new ApiError(401, 'User not found');

  const currentUserMembership = await OrganizationMember.findOne({
    userId: userId,
    organizationId: orgId,
    isDeleted: false,
  });

  if (!currentUserMembership) throw new ApiError(403, 'Unauthorized action');

  if (currentUserMembership.role !== RoleTypes.owner) {
    throw new ApiError(403, 'Insufficient permission');
  }

  //check target user
  const targetUser = await User.exists({ email: normalizedEmail });
  if (!targetUser) throw new ApiError(404, 'User not found');

  if (targetUser._id.toString() === userId) {
    throw new ApiError(400, 'You cannot remove yourself from the organization');
  }

  const targetUserMembership = await OrganizationMember.findOne({
    userId: targetUser._id,
    organizationId: orgId,
    isDeleted: false,
  });

  if (!targetUserMembership) throw new ApiError(403, 'Not a member of  this org');

  targetUserMembership.isDeleted = true;
  await targetUserMembership.save();
};


// Update member role
export const updateOrganizationMemberRole = async () => {};
// List organization members

export const getOrganizationMemberService = async (userId: string, orgId: string) => {
  if (!userId) throw new ApiError(401, 'Unauthorized user');

  const currentUser = await User.findOne({ userId: userId }).select('-password');
  if (!currentUser) throw new ApiError(404, 'User not found');

  const isMember = await OrganizationMember.findOne({
    userId,
    isDeleted: false,
    organizationId: orgId,
  });
  if (!isMember) throw new ApiError(401, 'Not a member');

  if (isMember?.role === RoleTypes.owner) {
    const getAll = await OrganizationMember.find({
      organizationId: isMember?.organizationId,
    }).populate('userId');

    return getAll;
  } else {
    throw new ApiError(401, 'You are not authorized to do that');
  }
};
