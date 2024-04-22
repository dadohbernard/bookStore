import { BookRepository } from '../repository/BookRepository';

export class BookService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async getAllBooks() {
    try {
      return await this.bookRepository.getAllBooks();
    } catch (error) {
      throw new Error(`Error fetching books: ${error}`);
    }
  }

  async getBookPrices(bookIds: number[]) {
    try {
        const prices = await Promise.all(bookIds.map(async (bookId) => {
            const price = await this.bookRepository.getBookPrice(bookId);
            return parseFloat(price); 
        }));
        return prices;
    } catch (error) {
        throw new Error(`Error fetching book prices: ${error}`);
    }
}
}
