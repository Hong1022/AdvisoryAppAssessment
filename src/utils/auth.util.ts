import { JWT_ACCESS_TOKEN_CONFIG } from '../configs/auth.config';
import { UserEntity } from '../entities/user.entity';
import jwt from 'jsonwebtoken';

const signToken = (user: UserEntity) => {
  return jwt.sign({ ...getAuthData(user) }, JWT_ACCESS_TOKEN_CONFIG.secret, {
    expiresIn: JWT_ACCESS_TOKEN_CONFIG.expiresIn,
  });
};

const decodeToken = (jwtToken: string) => {
  return jwt.decode(jwtToken);
};

const verifyToken = (jwtToken: string) => {
  return jwt.verify(jwtToken, JWT_ACCESS_TOKEN_CONFIG.secret);
};

const getAuthData = (user: UserEntity) => {
  return {
    id: user.id,
    roleType: user.roleType,
  };
};

const JWT = {
  signToken,
  decodeToken,
  verifyToken,
};

export default JWT;
