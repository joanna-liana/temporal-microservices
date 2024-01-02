import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { randomUUID } from 'crypto';

export enum PaymentStatus {
  Pending = 'Pending',
  Paid = 'Paid',
  Rejected = 'Rejected',
  Cancelled = 'Cancelled',
  Refunded = 'Refunded'
}

@Entity()
export class Payment {
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
  productId!: string;

  @Property()
  status: PaymentStatus = PaymentStatus.Pending;

  @Property({
    version: true
  })
  version!: number;
}
