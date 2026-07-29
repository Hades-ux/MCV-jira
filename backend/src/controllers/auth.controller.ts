import asyncHandler from '../utils/asyncHandler.js';
import { LoginDto, RegistrationDto } from '../dto/requests/auth.dto.js';
import { loginService, registrationService } from '../services/auth.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import { cookiesOption } from '../utils/cookiesOption.js';

export const registerUserController = asyncHandler(async (req, res) => {
  const Dto: RegistrationDto = req.body;

  const user = await registrationService(Dto);

  const response = {
    _id: user._id,
    firstName: user.firstName,
    lastname: user.lastName,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
  };

  return res.status(201).json(new ApiResponse('User created successfuly', response));
});

export const loginUserController = asyncHandler(async (req, res) => {
  const dto: LoginDto = req.body;

  const user = await loginService(dto);

  const response = {
    _id: user._id,
    fullName: user.firstName,
    lastname: user.lastName,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
  };

  const accessToken = (user as any).generateAccessToken();
  const refreshToken = (user as any).generateRefreshToken();

  await (user as any).saveRefreshToken(refreshToken);

  return res
    .cookie('accessToken', accessToken, cookiesOption)
    .cookie('refreshToken', refreshToken, cookiesOption)
    .status(200)
    .json(new ApiResponse('Login successful', response));
});
