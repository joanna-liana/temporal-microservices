import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { randomUUID } from 'crypto';

export enum OrderStatus {
  AwaitingPayment = 'AwaitingPayment',
  PreparingPackage = 'PreparingPackage',
  AwaitingDelivery = 'AwaitingDelivery',
  InDelivery = 'InDelivery',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled'
}

@Entity()
export class Order {
  [OptionalProps]?: 'createdAt' | 'updatedAt' | 'status' | 'version';

  @PrimaryKey({
    columnType: 'text'
  })
  id = randomUUID();

  @Property()
  createdBy!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({
    onUpdate: () => new Date()
  })
  updatedAt: Date = new Date();

  @Property()
  products!: string[];

  @Property()
  status: OrderStatus = OrderStatus.AwaitingPayment;

  @Property({
    version: true
  })
  version!: number;
}
