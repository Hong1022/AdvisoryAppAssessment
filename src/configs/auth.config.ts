import 'dotenv/config';

export const SALT_ROUNDS = 10;
export const REMEMBER_TOKEN_SALT_ROUNDS = 10;

const secret = process.env.JWT_SECRET;
if (!secret) throw new Error('JWT_SECRET cannot be null');

export const JWT_ACCESS_TOKEN_CONFIG = {
  secret: `access_${secret}`,
  expiresIn: '1d',
};

export const JWT_REMEMBER_TOKEN_CONFIG = {
    secret: `remember_${secret}`,
    expiresIn: '15d',
  };
