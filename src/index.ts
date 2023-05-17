import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { routes } from './routes';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

async function bootstrap() {
  app.use(bodyParser.json());

  app.use('/api', routes());

  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });

  try {
    await createConnection();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

bootstrap();
