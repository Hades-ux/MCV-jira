import { changePasswordDto } from "../dto/requests/user.dto.js";
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

export const getOwnerProfileService = async (userId: string) => {
  if (!userId) throw new ApiError(401, 'Unauthorized');

  const user = await User.findById({ _id: userId }).select('-password');

  if (!user) throw new ApiError(404, 'User not found');
  return user;
};

export const changePasswordService = async (dto: changePasswordDto, userId: string) => {
  if (!dto.newPassword) throw new ApiError(404, ' missing new password');
  if (!dto.oldPassword) throw new ApiError(404, ' missing old password');

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

  return true;
};
