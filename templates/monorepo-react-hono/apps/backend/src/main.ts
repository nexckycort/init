import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { jwt } from 'hono/jwt';
import { logger } from 'hono/logger';
import { JWT_SECRET, PORT } from './config/environment.js';
import auth from './routes/auth/routes.js';

const app = new Hono()
  .use(cors())
  .use(logger())
  .get('/', async (c) => {
    return c.json({ health: 'Active' });
  })
  .basePath('/api');

export const routes = app
  .route('/', auth)
  .use(jwt({ secret: JWT_SECRET }))
  .get('/me', async (c) => {
    const payload = c.get('jwtPayload');
    return c.json({
      id: payload.id,
      email: payload.email,
      name: payload.name,
    });
  });

export default {
  port: PORT,
  fetch: app.fetch,
};
