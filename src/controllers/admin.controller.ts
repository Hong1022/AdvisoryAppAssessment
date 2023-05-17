import { UserEntity } from '../entities/user.entity';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { comparePassword } from '../utils/password.utils';
import JWT from '../utils/auth.util';

export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({ status: '400', message: 'Email or password is empty.' });

    const user = await getRepository(UserEntity).findOne({ where: { email } });

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).send({ status: '401', message: 'Email or password is incorrect.' });
    }

    if (user.roleType !== 'a') {
      return res.status(403).send({ status: '403', message: 'Only admin allowed to login.' });
    }

    const accessToken = JWT.signToken(user);

    const result = {
      user_id: user.id,
      access_token: accessToken,
      token_type: 'Bearer ',
      roleType: user.roleType,
      expires_at: JWT.decodeToken(accessToken)?.exp,
    };

    return res.status(200).send({ status: '200', message: 'Logged in', result });
  } catch (e) {
    next(e);
  }
};
