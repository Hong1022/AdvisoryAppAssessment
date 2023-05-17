import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/auth.util';

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ status: '401', message: 'Access token not found.' });
  }

  const jwtToken = authHeader.substring(7); // Remove the 'Bearer ' prefix

  try {
    const user = JWT.verifyToken(jwtToken);
    if (!user) return res.status(401).send({ status: '401', message: 'Access token is invalid.' });

    next();
  } catch (e) {
    next(e);
  }
};
