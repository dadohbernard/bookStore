import { Request, Response } from 'express';
import { BookService } from '../service/BookService';

const bookService = new BookService();

export class BookController {
  async getAllBooks(req: Request, res: Response) {
    try {
      const books = await bookService.getAllBooks();
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
}
