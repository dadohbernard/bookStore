// // src/service/OrderService.ts

// import { OrderRepository } from '../repository/OrderRepository';

// export class OrderService {
//   private orderRepository: OrderRepository;

//   constructor() {
//     this.orderRepository = new OrderRepository();
//   }

//   async createOrder(customer_id: number, total_amount: string, bookIds: number[]) {
//     try {
//       // Remove parseFloat call and keep numericTotalAmount as string
//       const numericTotalAmount = total_amount.replace(',', '.');
      


//       // Check if numericTotalAmount is a valid number
//       if (isNaN(parseFloat(numericTotalAmount)) || parseFloat(numericTotalAmount) <= 0) {
//         throw new Error('Invalid total amount');
//       }

//       // Proceed with creating the order
//       const orderId = await this.orderRepository.createOrder(customer_id, parseFloat(numericTotalAmount), bookIds);
//       return orderId;
//     } catch (error) {
//       throw new Error(`Error creating order: ${error}`);
//     }
//   }
// }


// src/service/OrderService.ts

import { OrderRepository } from '../repository/OrderRepository';
import { CustomerRepository } from '../repository/CustomerRepository';

export class OrderService {
  private orderRepository: OrderRepository;
  private customerRepository: CustomerRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.customerRepository = new CustomerRepository();
  }

  async createOrder(customer_id: number, total_amount: string, bookIds: number[]) {
    try {
      const numericTotalAmount = total_amount.replace(',', '.');
      
      if (isNaN(parseFloat(numericTotalAmount)) || parseFloat(numericTotalAmount) <= 0) {
        throw new Error('Invalid total amount');
      }

      const currentPoints = await this.customerRepository.getCustomerPoints(customer_id);
      
      const newPoints = currentPoints - parseFloat(numericTotalAmount);
      
      await this.customerRepository.updateCustomerPoints(customer_id, newPoints);

      const orderId = await this.orderRepository.createOrder(customer_id, parseFloat(numericTotalAmount), bookIds);
      
      return orderId;
    } catch (error) {
      throw new Error(`Error creating order: ${error}`);
    }
  }




  async cancelOrder(orderId: number) {
    try {
      await this.orderRepository.cancelOrder(orderId);
    } catch (error) {
      throw new Error(`Error cancelling order: ${error}`);
    }
  }

  async getBoughtBooks(customer_id: number) {
    try {
      return await this.orderRepository.getBoughtBooks(customer_id);
    } catch (error) {
      throw new Error(`Error fetching bought books: ${error}`);
    }
  }

  
}
