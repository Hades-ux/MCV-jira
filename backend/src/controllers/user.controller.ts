
import { changePasswordDto } from "../dto/requests/user.dto.js";
import { changePasswordService, getOwnerProfileService } from '../services/user.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getOwnerProfileController = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const user = await getOwnerProfileService(userId);

  const response = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
  };

  return res.status(200).json(new ApiResponse('user fetch successfully', response));
});

export const changePasswordController = asyncHandler(async (req, res) => {
  const dto: changePasswordDto = req.body;
  const userId = req.user?._id;

  await changePasswordService( dto, userId);

  return res.status(200).json(new ApiResponse('password changed successfully'));
});