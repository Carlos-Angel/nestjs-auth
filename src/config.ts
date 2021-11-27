import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: process.env.PORT,
  isDev: process.env.NODE_ENV !== 'production',
  database: {
    url: process.env.DATABASE_URL,
  },
}));
