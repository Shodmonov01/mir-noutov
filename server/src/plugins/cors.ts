import cors from '@fastify/cors';
import type { FastifyInstance } from 'fastify';
import type { Config } from '../config';

export const registerCors = async (fastify: FastifyInstance, config: Config): Promise<void> => {
  await fastify.register(cors, {
    origin: config.CORS_ORIGIN === '*' ? true : config.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Telegram-Init-Data'],
  });
};
