
import { changePasswordDto } from "../dto/requests/user.dto.js";
import { changePasswordService, getOwnerProfileService, uploadAvatarService } from '../services/user.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from "../utils/ApiError.js";

export const getOwnerProfileController = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const user = await getOwnerProfileService(userId);

  const response = {
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatar: user.avatar?.url,
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

export const uploadAvatarController = asyncHandler(async (req, res) => {
  const path = req.file?.path;
  const userId = req.user?._id;


  if (!path) {
    throw new ApiError(400, "Avatar file is required");
  }

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const profile = await uploadAvatarService(path,userId);

  const response={
    url : profile.url,
    public_id: profile.publicId
  }

  return res.status(200).json(new ApiResponse("Avatar upload successfully", response))
  
})