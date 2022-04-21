import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import authRouter from '../router/auth';
import shopRouter from '../router/shop';
import userRouter from '../router/user';
import menuRouter from '../router/menu';
import commentRouter from '../router/comment';
import reservationRouter from '../router/reservation';

const app = express();

const local = 'http://localhost:4000';

app.use(
  cors({
    origin: [`${local}`],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
  }),
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('welcome!');
});

// Auth
app.use('/auth', authRouter);
// Shop
app.use('/shop', shopRouter);
// User
app.use('/user', userRouter);
// Menu
app.use('/menu', menuRouter);
// Comment
app.use('/comment', commentRouter);
// Reservation
app.use('/reservation', reservationRouter);

app.listen('4000', () => {
  console.log('Hello World');
});

export default app;
