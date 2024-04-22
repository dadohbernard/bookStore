import { Customer } from '../entity/Customer';
import { CustomerRepository } from '../repository/CustomerRepository';

const customerRepository = new CustomerRepository();

export class CustomerService {
  
  // Register
  async registerCustomer(name: string, email: string, password: string) {
    const existingCustomer = await customerRepository.getCustomerByEmail(email);
    if (existingCustomer) {
      throw new Error('Customer with this email already exists');
    }
    const customer = new Customer(name, email, password, 100); 
    return customerRepository.createCustomer(customer);
  }

  // Login
  async login(email: string, password: string) {
    const customer = await customerRepository.getCustomerByEmail(email);
    if (!customer) {
      throw new Error('Customer not found');
    }
    if (customer.password !== password) {
      throw new Error('Incorrect password');
    }
    return customer;
  }

  async getCustomerPoints(customerId: number) {
    try {

      const customerPoints = await customerRepository.getCustomerPoints(customerId);
      return customerPoints;
    } catch (error) {
      console.error('Failed to retrieve customer pointss:', error);
      throw new Error('Failed to retrieve customer pointss');
    }
  }

}
