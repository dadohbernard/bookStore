import express from 'express';
import { BookController } from './controller/BookController';
import { CustomerController } from './controller/CustomerController';
import { OrderController } from './controller/orderController';


const app = express();
app.use(express.json());
const PORT = 4000;



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  next();
});

const customerController = new CustomerController();
const bookController = new BookController();
const orderController = new OrderController();

app.get('/books', bookController.getAllBooks);
app.post('/register', customerController.register);
app.post('/login', customerController.login);
app.post('/orders', orderController.createOrder);
app.delete('/orders/:orderId', orderController.cancelOrder);
app.get('/orders/:customerId/books', orderController.getBoughtBooks); 



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
