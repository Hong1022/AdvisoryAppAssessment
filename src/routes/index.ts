import * as express from 'express';
import user from './user.routes';
import admin from './admin.routes';
import listing from './listing.routes';

export const routes = (): express.Router => {
  const api: express.Router = express.Router();
  api.use('/user', user);
  api.use('/admin', admin);
  api.use('/listing', listing);
  return api;
};
