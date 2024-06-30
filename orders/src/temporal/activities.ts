import { CreateOrderDto,OrdersService } from '../orders.service';

// export async function reserveItems() {
//   console.log('Order items have been placed on hold in the inventory 🔐');
// }

// export async function saveOrder() {
//   console.log('Order has been persisted 💾');
// }

export const createActivities = (orderService: OrdersService) => ({
  async reserveItems() {
    console.log('Order items have been placed on hold in the inventory 🔐');
  },
  async saveOrder(input: CreateOrderDto) {
    const order = await orderService.create(input);

    console.log('Order has been persisted 💾');

    return order;
  }
});
