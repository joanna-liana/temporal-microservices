import 'dotenv/config';

import { randomUUID } from 'node:crypto';

import { MikroORM, RequestContext } from '@mikro-orm/core';
import type { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { AsyncLocalStorage } from 'async_hooks';
import express from 'express';

import { errorHandler } from './common/middleware/errorHandler';
import { Order } from './order.entity';
import { OrdersController } from './orders.controller';
import { ordersRoutes } from './orders.routes';
import { OrdersService } from './orders.service';
import { setUpClient } from './temporal/client';

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

  const temporalClient = await setUpClient();
  const ordersService = new OrdersService(orm.em);
  const ordersController = new OrdersController(temporalClient, ordersService);

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
    '/api/v1/orders',
    ordersRoutes(ordersController)
  );

  app.use(errorHandler);

  return app;
};

async function setUpORM(): Promise<MikroORM<PostgreSqlDriver>> {
  const orm = await MikroORM.init<PostgreSqlDriver>({
    entities: ['./**/*.entity.js'],
    entitiesTs: ['./**/*.entity.ts'],
    dbName: 'saga_orders',
    type: 'postgresql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5441,
    password: process.env.DB_PASSWORD
  });

  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();

  await _debugDb(orm);

  return orm;
}

async function _debugDb(orm: MikroORM<PostgreSqlDriver>): Promise<void> {
  const ordersRepo = orm.em.fork().getRepository(Order);

  const sampleOrder = ordersRepo.create({
    products: ['1', '2', '3'],
    createdBy: 'INIT_USER',
  });

  await ordersRepo.upsert(sampleOrder);

  const ordersInDb = await ordersRepo.find({
  });

  console.log('[DB_DEBUG] Initial Orders', ordersInDb);
}
