import { changePasswordDto } from '../dto/requests/user.dto.js';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import { fileUpload, deleteUpload } from '../utils/cloudinery.js';

export const getOwnerProfileService = async (userId: string) => {
  if (!userId) throw new ApiError(401, 'Unauthorized');

  const user = await User.findById({ _id: userId }).select('-password');

  if (!user) throw new ApiError(404, 'User not found');
  return user;
};

export const changePasswordService = async (
  dto: changePasswordDto,
  userId: string,
): Promise<void> => {
  if (!dto.newPassword) throw new ApiError(400, ' missing new password');
  if (!dto.oldPassword) throw new ApiError(400, ' missing old password');

  const currentUser = await User.findById(userId).select('+password');

  if (!currentUser) throw new ApiError(404, 'User not found');

  const isMatch = await (currentUser as any).isPasswordCorrect(dto.oldPassword);

  if (!isMatch) {
    throw new ApiError(400, 'Old password is incorrect');
  }

  const isSamePassword = await (currentUser as any).isPasswordCorrect(dto.newPassword);

  if (isSamePassword) {
    throw new ApiError(400, 'New password must be different from old password');
  }

  currentUser.password = dto.newPassword;
  await currentUser.save();
};

export const uploadAvatarService = async (path: string, userId: string) => {
  if (!path) throw new ApiError(400, 'File not found');
  if (!userId) throw new ApiError(401, 'Unauthorized');

  const currentUser = await User.findById(userId);

  if (!currentUser) throw new ApiError(404, 'User not found');
  if (!currentUser.avatar) throw new ApiError(500, 'Avatar object is missing');

  const oldPublicId = currentUser.avatar.publicId;

  let avatar;

  try {
    avatar = await (fileUpload as any)(path);
    if (!avatar) throw new ApiError(503, 'upload failed');
  } catch (error) {
    console.error(error);
    throw new ApiError(503, 'Aavtar upload failed');
  }

  if (oldPublicId) {
    try {
      await deleteUpload(oldPublicId);
    } catch (error) {
      console.error(error);
    }
  }

  currentUser.avatar.url = avatar.url;
  currentUser.avatar.publicId = avatar.public_id;
  await currentUser.save();

  return avatar;
};
