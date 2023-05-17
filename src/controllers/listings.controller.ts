import { ListingEntity } from '../entities/listing.entity';
import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import moment from 'moment';
import { getRepository } from 'typeorm';
import { calculateDistance } from '../utils/distance.utils';
import JWT from '../utils/auth.util';
import { UserRoleTypeEnum } from '../enum/user.enum';

export const getAllListings = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const jwtToken = authHeader.substring(7); // Remove the 'Bearer ' prefix

  const decode = JWT.decodeToken(jwtToken);
  if (!decode.roleType || decode.roleType !== UserRoleTypeEnum.a)
    return res.status(403).send({ status: '403', message: 'Only admin can view all listings.' });

  console.log(decode);
  const listings = await getRepository(ListingEntity).find({});

  return res
    .status(200)
    .send({ status: '200', message: 'Success', result: { current_page: 1, data: listings } });
};

export const getUserListings = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const jwtToken = authHeader.substring(7); // Remove the 'Bearer ' prefix

  const decode = JWT.decodeToken(jwtToken);
  if (!decode.id) return res.status(403).send({ status: '403', message: 'User Id is empty.' });

  const { currentLatitude, currentLongitude } = req.query;
  if (!currentLatitude && !currentLongitude)
    return res.status(400).send({ status: '400', message: 'Location not complete' });

  const listings = await getRepository(ListingEntity).find({
    where: { userId: decode.id },
  });

  const data = await Promise.all(
    listings.map((l) => {
      const distance = calculateDistance(
        Number(l.latitude),
        Number(l.longitude),
        Number(currentLatitude),
        Number(currentLongitude),
      );

      return {
        id: l.id,
        name: l.name,
        distance,
        createdAt: moment(l.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: l.updatedAt ? moment(l.updatedAt).format('YYYY-MM-DD HH:mm:ss') : '',
      };
    }),
  );

  return res.status(200).send({ message: 'Success', result: { current_page: 1, data } });
};

export const createListing = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const jwtToken = authHeader.substring(7); // Remove the 'Bearer ' prefix

  const decode = JWT.decodeToken(jwtToken);
  if (!decode.roleType || decode.roleType !== UserRoleTypeEnum.a)
    return res.status(403).send({ status: '403', message: 'Only admin can create listings.' });

  const { name, longitude, latitude, userId } = req.body;
  if (!name || !longitude || !latitude || !userId)
    return res.status(400).send({ status: '400', message: 'Input is not completed.' });

  const listing = getRepository(ListingEntity).create({
    name,
    longitude,
    latitude,
    userId,
  });

  await getRepository(ListingEntity).save(listing);

  return res.status(200).send({ status: '200', message: 'Create Successfully.', result: listing });
};

export const updateListing = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const jwtToken = authHeader.substring(7); // Remove the 'Bearer ' prefix

  const decode = JWT.decodeToken(jwtToken);
  if (!decode.roleType || decode.roleType !== UserRoleTypeEnum.a)
    return res.status(403).send({ status: '403', message: 'Only admin can update listings.' });

  const { id } = req.body;
  if (!id) return res.status(400).send({ status: '400', message: 'Id is not provided.' });

  const input = { ..._.omit(req.body, ['id']) };
  if (!input || Object.keys(input).length < 1)
    return res.status(400).send({ status: '400', message: 'Input is not completed.' });

  const listing = await getRepository(ListingEntity).findOne({ where: { id } });
  if (!listing) return res.status(400).send({ status: '400', message: 'Listing not found.' });

  getRepository(ListingEntity).merge(listing, input);

  await getRepository(ListingEntity).save(listing);

  return res.status(200).send({ status: '200', message: 'Update Successfully.', result: listing });
};

export const deleteListing = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const jwtToken = authHeader.substring(7); // Remove the 'Bearer ' prefix

  const decode = JWT.decodeToken(jwtToken);
  if (!decode.roleType || decode.roleType !== UserRoleTypeEnum.a)
    return res.status(403).send({ status: '403', message: 'Only admin can delete listings.' });

  const { id } = req.body;
  if (!id) return res.status(400).send({ status: '400', message: 'Id is not provided.' });

  const listing = await getRepository(ListingEntity).findOne({ where: { id } });
  if (!listing) return res.status(400).send({ status: '400', message: 'Listing not found.' });

  await getRepository(ListingEntity).softDelete({ id });

  return res.status(200).send({ status: '200', message: 'Delete Successfully.' });
};
