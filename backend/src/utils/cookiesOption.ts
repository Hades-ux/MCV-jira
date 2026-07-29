import { CookieOptions } from "express";

export const accessTokenCookieOption: CookieOptions = {
   httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000,
}

export const refreshTokenCookieOption:CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
