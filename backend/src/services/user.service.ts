import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

export const getOwnerProfileService = async (userId: string) => {
  if (!userId) throw new ApiError(401, 'Unauthorized');

  const user = await User.findById({ _id: userId }).select('-password');

  if (!user) throw new ApiError(404, 'User not found');
  return user;
};
