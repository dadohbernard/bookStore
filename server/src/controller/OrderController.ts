import { Request, Response } from 'express';
import { OrderService } from '../service/OrderService';
import { CustomerService } from '../service/CustomerService';
import { BookService } from '../service/BookService'; 

const orderService = new OrderService();
const customerService = new CustomerService();
const bookService = new BookService();

export class OrderController {
  async createOrder(req: Request, res: Response) {
    const { customer_id, bookIds } = req.body;
    
    try {
      const customerPoints = await customerService.getCustomerPoints(customer_id);
      
      const bookPrices = await bookService.getBookPrices(bookIds);
      
      const totalCost = bookPrices.reduce((acc, price) => acc + price, 0);
      if (customerPoints === undefined) {
        return res.status(500).json({ error: 'Failed to retrieve customer points' });
      }
      if (customerPoints < totalCost) {
        return res.status(400).json({ error: 'Insufficient points' });
      }
      
      const orderId = await orderService.createOrder(customer_id, totalCost.toString(), bookIds);

      res.status(201).json('Order Successfully');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }

  async cancelOrder(req: Request, res: Response) {
    const { orderId } = req.params;
    
    try {
      await orderService.cancelOrder(parseInt(orderId));
      
      res.status(200).json({ message: 'Order cancelled successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }



  async getBoughtBooks(req: Request, res: Response) {
    const { customerId } = req.params;
    
    try {
      const customerIdNumber = parseInt(customerId);
      if (isNaN(customerIdNumber)) {
        return res.status(400).json({ error: 'Invalid customer ID' });
      }

      const boughtBooks = await orderService.getBoughtBooks(customerIdNumber);
      res.status(200).json({ bought_books: boughtBooks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
}
