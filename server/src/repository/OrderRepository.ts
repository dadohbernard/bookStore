import pool from '../config/database';

export class OrderRepository {
  async createOrder(customer_id: number, total_amount: number, bookIds: number[]) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const orderQueryResult = await client.query('INSERT INTO orders (customer_id, total_amount) VALUES ($1, $2) RETURNING order_id', [customer_id, total_amount]);
      const orderId = orderQueryResult.rows[0].order_id;
      await Promise.all(bookIds.map(bookId => client.query('INSERT INTO order_books (order_id, book_id) VALUES ($1, $2)', [orderId, bookId])));
      await client.query('COMMIT');
      console.log('New order ID:', orderId);
      return orderId;
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error creating order:', error); 
      throw new Error(`Error creating order: ${error}`);
    } finally {
      client.release();
    }
  }

  async cancelOrder(orderId: number) {
    const client = await pool.connect();
    try {
      await client.query('DELETE FROM orders WHERE order_id = $1', [orderId]);
    } finally {
      client.release();
    }
  }


  async getBoughtBooks(customer_id: number) {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM orders WHERE customer_id = $1', [customer_id]);
      return result.rows;
    } finally {
      client.release();
    }
  }


  
}
