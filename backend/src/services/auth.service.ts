import type { RegistrationDto } from '../dto/requests/auth.dto.js';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

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