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
      invitedBy: typeof currentUser._id;
    } = {
      organizationId: organization._id,
      userId: currentUser._id,
      invitedBy: currentUser._id,
      role: 'OWNER' as RoleTypes,
    };
    const orgMember = await OrganizationMember.create(orgMemberData);

    if (!orgMember) throw new ApiError(403, 'Bad request');

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
export const updateOrganizationService = async (
  userId: string,
  orgId: string,
  name?: string,
  path?: string,
) => {
  if (!userId) throw new ApiError(401, 'Unauthorized');
  if (!orgId) throw new ApiError(400, 'Organization id not found');

  const isMember = await OrganizationMember.findOne({
    _id: userId,
    organizationId: orgId,
    isDeleted: false,
  });
  if (!isMember) throw new ApiError(401, 'Not member of any organiztion');

  const role = isMember?.role as RoleTypes.owner;

  if (role !== 'OWNER') throw new ApiError(400, 'Bad request');

  const Org = await Organization.findOne({ _id: orgId, isDeleted: false });

  if (!Org) throw new ApiError(400, 'Organization not found');

  let oldLogo;
  // for logo update
  if (path) {
    try {
      const img = await fileUpload(path);
      if (!img) throw new ApiError(400, 'logo file not found');

      oldLogo = Org?.logo?.publicId;
      if (Org?.logo) {
        Org.logo.url = img.secure_url;
        Org.logo.publicId = img.public_id;
      }
    } catch (error) {
      console.error('error: ', error);
      throw new ApiError(503, 'logo upload filed');
    }
  }

  // for name Update
  if (name?.trim()) Org.name = name.trim();

  await Org.save({ validateBeforeSave: false });

  if (oldLogo) {
    try {
      await deleteUpload(oldLogo);
    } catch (error) {
      console.error('Old logo deletion failed:', error);
      // Queue this later
    }
  }

  return Org;
};

// Soft delete organization
export const softDeleteOrganizationService = async () => {};
