import { SALT_ROUNDS } from "../configs/auth.config";
import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  passwordHash: string
) => {
  return bcrypt.compare(password, passwordHash);
};
