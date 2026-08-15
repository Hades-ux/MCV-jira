import asyncHandler from '../utils/asyncHandler.js';
import { LoginDto, RegistrationDto } from '../dto/requests/auth.dto.js';
import {
  loginService,
  logOutService,
  refreshTokenRotationService,
  registrationService,
} from '../services/auth.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import { accessTokenCookieOption, refreshTokenCookieOption } from '../utils/cookiesOption.js';
import { UserResponseDto } from '../dto/response/user.dto.js';

export const registerUserController = asyncHandler(async (req, res) => {
  const dto: RegistrationDto = req.body;

  const user = await registrationService(dto);

  const response = {
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatar: user.avatar,
    createdAt: user.createdAt.toISOString(),
  };

  return res.status(201).json(new ApiResponse('User created successfully', response));
});

export const loginUserController = asyncHandler(async (req, res) => {
  const dto: LoginDto = req.body;

  const data = await loginService(dto);

  const response: UserResponseDto = {
    _id: data.user._id.toString(),
    firstName: data.user.firstName,
    lastName: data.user.lastName,
    email: data.user.email,
    avatar: data.user.avatar,
    createdAt: data.user.createdAt.toISOString(),
    organizationId: data.orgId.toString(),
  };

  const accessToken = (data.user as any).generateAccessToken();
  const refreshToken = (data.user as any).generateRefreshToken();

  await (data.user as any).saveRefreshToken(refreshToken);

  return res
    .cookie('accessToken', accessToken, accessTokenCookieOption)
    .cookie('refreshToken', refreshToken, refreshTokenCookieOption)
    .status(200)
    .json(new ApiResponse('Login successful', response));
});

export const logoutController = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  await logOutService(userId);

  return res
    .clearCookie('accessToken', accessTokenCookieOption)
    .clearCookie('refreshToken', refreshTokenCookieOption)
    .json(new ApiResponse('Logged out successfully'));
});

export const refreshTokenRotationController = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  const data = await refreshTokenRotationService(token);

  const response: UserResponseDto = {
    _id: data.user._id.toString(),
    firstName: data.user.firstName,
    lastName: data.user.lastName,
    email: data.user.email,
    avatar: data.user.avatar,
    createdAt: data.user.createdAt.toISOString(),
    organizationId: data.orgId.toString(),
  };

  const accessToken = (data.user as any).generateAccessToken();
  const refreshToken = (data.user as any).generateRefreshToken();

  await (data.user as any).saveRefreshToken(refreshToken);

  return res
    .cookie('accessToken', accessToken, accessTokenCookieOption)
    .cookie('refreshToken', refreshToken, refreshTokenCookieOption)
    .status(200)
    .json(new ApiResponse('Token refreshed successfully', response));
});
