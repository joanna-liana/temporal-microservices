import { wrap } from '@mikro-orm/core';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

import { Payment, PaymentStatus } from './payment.entity';

type CreatePaymentDto = {
  productId: string;
  createdBy: string;
};

export class PaymentsService {
  constructor(private readonly entityManager: EntityManager) {}

  private get ordersRepository(): EntityRepository<Payment> {
    return this, this.entityManager.getRepository(Payment);
  }

  async cancel(orderId: Payment['id']): Promise<void> {
    const order = await this.ordersRepository.findOneOrFail({
      id: orderId
    });

    wrap(order).assign({
      id: orderId,
      status: PaymentStatus.Cancelled
    });

    await this.ordersRepository.upsert(order);
    await this.entityManager.flush();
  }

  async pay(orderId: Payment['id']): Promise<void> {
    const order = await this.ordersRepository.findOneOrFail({
      id: orderId
    });

    wrap(order).assign({
      id: orderId,
      status: PaymentStatus.Paid
    });

    await this.ordersRepository.upsert(order);
    await this.entityManager.flush();
  }

  async reject(orderId: Payment['id']): Promise<void> {
    const order = await this.ordersRepository.findOneOrFail({
      id: orderId
    });

    wrap(order).assign({
      id: orderId,
      status: PaymentStatus.Rejected
    });

    await this.ordersRepository.upsert(order);
    await this.entityManager.flush();
  }

  async refund(orderId: Payment['id']): Promise<void> {
    const order = await this.ordersRepository.findOneOrFail({
      id: orderId
    });

    wrap(order).assign({
      id: orderId,
      status: PaymentStatus.Refunded
    });

    await this.ordersRepository.upsert(order);
    await this.entityManager.flush();
  }

  async create(input: CreatePaymentDto): Promise<Payment> {
    const orderToCreate = this.ordersRepository.create(input);

    const order = await this.ordersRepository.upsert(orderToCreate);

    return order;
  }
}
