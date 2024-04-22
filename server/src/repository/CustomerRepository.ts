import pool from '../config/database';
import { Customer } from '../entity/Customer';

export class CustomerRepository {
  async createCustomer(customer: Customer) {
    try {
      const client = await pool.connect();
      const result = await client.query('INSERT INTO customers (name, email, password, point) VALUES ($1, $2, $3, $4) RETURNING *', [customer.name, customer.email, customer.password, customer.points]);
      client.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating customer: ${error}`);
    }
  }

  async getCustomerByEmail(email: string) {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM customers WHERE email = $1', [email]);
      client.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error fetching customer by email: ${error}`);
    }
  }



  async getCustomerById(customerId: number): Promise<Customer | null> {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM customers WHERE customer_id = $1', [customerId]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async getCustomerPoints(customerId: number) {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT point FROM customers WHERE customer_id = $1', [customerId]);
      if (result.rows.length === 0) {
        throw new Error('Customer not found');
      }
      return result.rows[0].point;
    } catch (error) {
      console.error('Failed to retrieve customer points:', error);
      throw new Error('Failed to retrieve customer points');
    } finally {
      client.release();
    }
  }
  

  async updateCustomerPoints(customerId: number, newPoints: number) {
    const client = await pool.connect();
    try {
      await client.query('UPDATE customers SET point = $1 WHERE customer_id = $2', [newPoints, customerId]);
    } catch (error) {
      console.error('Failed to update customer points:', error);
      throw new Error('Failed to update customer points');
    } finally {
      client.release();
    }
  }


}
