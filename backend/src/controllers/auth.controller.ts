import asyncHandler from '../utils/asyncHandler.js';
import { RegistrationDto } from '../dto/requests/auth.dto.js';
import { registrationService } from '../services/auth.service.js';

export const registerUserController = asyncHandler(async (req, res) => {
  const Dto: RegistrationDto = req.body;

  const user = await registrationService(Dto);

  const response = {
    _id: user._id,
    fullName: user.firstName,
    lastname: user.lastName,
    email: user.email,
    createAt: user.createdAt.toISOString(),
  };

  res.status(200).json({ response });
});
