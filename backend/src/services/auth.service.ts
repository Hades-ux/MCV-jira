import type { LoginDto, RegistrationDto } from '../dto/requests/auth.dto.js';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const registrationService = async (dto: RegistrationDto) => {
  const normalizeEmail = dto.email.trim().toLowerCase();

  const isUserExist = await User.findOne({ email: normalizeEmail });

  if (isUserExist) throw new ApiError(409, 'User already exists');

  const userData = {
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: normalizeEmail,
    password: dto.password,
  };

  const createdUser = await User.create(userData);

  return createdUser;
};

export const loginService = async (dto: LoginDto) => {
  const normalizeEmail: string = dto.email.trim().toLowerCase();

  const user = await User.findOne({ email: normalizeEmail }).select('+password');

  if (!user) throw new ApiError(401, 'Invalid credentials');

  const isValid = await (user as any).isPasswordCorrect(dto.password);

  if (!isValid) throw new ApiError(401, 'Invalid credentials');

  return user;
};

export const logOutService = async (_id: string): Promise<void> => {
  if (!_id) throw new ApiError(401, 'Unauthorized');

  const user = await User.findByIdAndUpdate({ _id }, { $unset: { refreshToken: 1 } });
  if (!user) throw new ApiError(404, 'User not found');
};

export const refreshTokenRotationService = async (token: string)=> {
  if (!token) throw new ApiError(401, 'Unauthorized');

  const payloadUser = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as jwt.JwtPayload;

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({refreshToken:hashedToken});

  if (!user) throw new ApiError(401, 'Unauthorized');

  if(user._id.toString() !== payloadUser._id.toString()) throw new ApiError(401, "Invalid refresh token")

    return user;
};

// TODO: Replace 'any' with proper IUserDocument type.