import { Request, Response } from 'express';
import { CustomerService } from '../service/CustomerService';

const customerService = new CustomerService();
export class CustomerController {

  //register
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      const newCustomer = await customerService.registerCustomer(name, email, password);
      res.json(newCustomer);
    } catch (error) {
      if (isCustomError(error)) { 
        res.status(400).json({ error: error.message });
      } else {
        throw error; 
      }
    }
  }

  //login
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const customer = await customerService.login(email, password);
      res.json(customer);
    } catch (error) {
      if (isCustomError(error)) { 
        res.status(400).json({ error: error.message });
      } else {
        throw error; 
      }
    }
  }

}





// Check if the error is of CustomError type
function isCustomError(error: any): error is CustomError {
  return (error as CustomError)?.message !== undefined;
}

// Define custom error type
interface CustomError extends Error {
  message: string;
}
