import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { z } from 'zod';
import { prisma } from '../../config/db.js';
import { JWT_SECRET } from '../../config/environment.js';

const app = new Hono()
  .post(
    '/sign-up',
    zValidator(
      'json',
      z.object({
        email: z.string(),
        password: z.string(),
        name: z.string(),
      }),
    ),
    async (c) => {
      try {
        const { email, password, name } = c.req.valid('json');

        const existingUser = await prisma.user.findUnique({
          select: {
            id: true,
          },
          where: { email },
        });
        if (existingUser) {
          return c.json(
            { error: 'El correo electrónico ya está registrado' },
            409,
          );
        }

        const hashedPassword = await Bun.password.hash(password);

        const newUser = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name,
          },
        });

        return c.json(
          {
            message: 'Usuario creado exitosamente',
            user: { id: newUser.id, email: newUser.email, name: newUser.name },
          },
          201,
        );
      } catch (error) {
        console.error('Error al crear el usuario:', error);
        return c.json({ error: 'Ocurrió un error al crear el usuario' }, 500);
      }
    },
  )
  .post(
    '/sign-in',
    zValidator(
      'json',
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    ),
    async (c) => {
      try {
        const { email, password } = c.req.valid('json');

        const user = await prisma.user.findUnique({
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
          },
          where: { email },
        });
        if (!user) {
          return c.json({ error: 'Credenciales inválidas' }, 401);
        }

        const isPasswordValid = await Bun.password.verify(
          password,
          user.password,
        );
        if (!isPasswordValid) {
          return c.json({ error: 'Credenciales inválidas' }, 401);
        }

        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
          exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60,
        };

        const token = await sign(payload, JWT_SECRET);

        return c.json({
          message: 'Inicio de sesión exitoso',
          token,
          user: { id: user.id, email: user.email, name: user.name },
        });
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return c.json({ error: 'Ocurrió un error al iniciar sesión' }, 500);
      }
    },
  );

export default app;
