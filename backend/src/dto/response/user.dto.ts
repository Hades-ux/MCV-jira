export interface UserResponseDto {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  avatar?: {
    url: string;
    publicId: string;
  } | null;
}
