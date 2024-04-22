
import pool from '../config/database';

export class BookRepository {
    
  async getAllBooks() {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM books');
      client.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching books: ${error}`);
    }
  }


  async getBookPrice(bookId: number) {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT point FROM books WHERE book_id = $1', [bookId]);
      return result.rows[0]?.point ?? 0;
    } finally {
      client.release();
    }
  }

}
