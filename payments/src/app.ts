import 'dotenv/config';

import { randomUUID } from 'node:crypto';

import { MikroORM, RequestContext } from '@mikro-orm/core';
import type { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { AsyncLocalStorage } from 'async_hooks';
import express from 'express';

import { errorHandler } from './common/middleware/errorHandler';
import { Payment } from './payment.entity';
import { PaymentsController } from './payments.controller';
import { paymentsRoutes } from './payments.routes';
import { PaymentsService } from './payments.service';

export const context = new AsyncLocalStorage();

export const getApp = async (): Promise<express.Application> => {
  const app = express();

  const orm = await setUpORM();

  app.set(
    'trust proxy',
    1
  );

  app.use(express.json());

  app.use((req, res, next) => {
    // calls `orm.em.fork()` and attaches it to the async context
    RequestContext.create(orm.em, next);
  });

  const paymentsService = new PaymentsService(orm.em);
  const paymentsController = new PaymentsController(paymentsService);

  app.use(
    '*',
    (_req, _res, next) => {
      const store = context.getStore();

      (store as Map<string, unknown>).set(
        'id',
        randomUUID()
      );

      next();
    }
  );

  app.use(
    '/api/v1/payments',
    paymentsRoutes(paymentsController)
  );

  app.use(errorHandler);

  return app;
};

async function setUpORM(): Promise<MikroORM<PostgreSqlDriver>> {
  const orm = await MikroORM.init<PostgreSqlDriver>({
    entities: ['./**/*.entity.js'],
    entitiesTs: ['./**/*.entity.ts'],
    dbName: 'saga_payments',
    type: 'postgresql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5442,
    password: process.env.DB_PASSWORD
  });

  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();

  await _debugDb(orm);

  return orm;
}

async function _debugDb(orm: MikroORM<PostgreSqlDriver>): Promise<void> {
  const paymentsRepo = orm.em.fork().getRepository(Payment);

  const samplePayment = paymentsRepo.create({
    productId: '1',
    createdBy: 'INIT_USER',
  });

  await paymentsRepo.upsert(samplePayment);

  const paymentsInDb = await paymentsRepo.find({
  });

  console.log('[DB_DEBUG] Initial Payments', paymentsInDb);
}
