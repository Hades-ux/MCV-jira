import { OrganizationInputDto } from '../dto/requests/organization.dto.js';
import Organization from '../models/organization.model.js';
import OrganizationMember, { RoleTypes } from '../models/organizationMember.model.js';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import { deleteUpload, fileUpload } from '../utils/cloudinary.js';

//create organiztion
export const createOrganizationService = async (
  dto: OrganizationInputDto,
  userId: string,
  path: string,
) => {
  if (!dto) throw new ApiError(400, 'Request body is missing');
  if (!userId) throw new ApiError(401, 'Unauthorized');
  if (!path) throw new ApiError(400, 'Organization logo is required');

  const currentUser = await User.findById(userId).select('_id email');
  if (!currentUser) throw new ApiError(404, 'User not found');

  const isExist = await Organization.findOne({ name: dto.name }).select('_id');
  if (isExist) throw new ApiError(409, 'Organization already exists');

  // const slugExists = await Organization.findOne({ slug: dto.slug }).select('_id');

  // if (slugExists) throw new ApiError(409, 'Slug already exists');

  let logo;
  try {
    logo = await fileUpload(path);

    const data = {
      name: dto.name,
      // slug: dto.slug,
      owner: userId,
      logo: {
        url: logo.secure_url,
        publicId: logo.public_id,
      },
    };

    const organization = await Organization.create(data);

    const orgMemberData: {
      organizationId: typeof organization._id;
      userId: typeof currentUser._id;
      role: RoleTypes;
      invitedBy: typeof currentUser._id
    } = {
      organizationId: organization._id,
      userId: currentUser._id,
      invitedBy:currentUser._id,
      role: 'OWNER' as RoleTypes,
    };
    const orgMember = await OrganizationMember.create(orgMemberData);

    if(!orgMember) throw new ApiError(403,"Bad request")

    return organization;
  } catch (error: any) {
    if (logo?.public_id) {
      await deleteUpload(logo.public_id);
    }

    if (error.code === 11000) {
      throw new ApiError(409, 'Organization already exists');
    }
    throw error;
  }
};

// Get organization by ID
export const getOrganizationService = async () => {};

// Update organization
export const updateOrganizationService = async () => {};

// Soft delete organization
export const softDeleteOrganizationService = async () => {};
