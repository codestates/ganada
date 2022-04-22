import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import authRouter from '../router/auth';
import shopRouter from '../router/shop';
import userRouter from '../router/user';
import menuRouter from '../router/menu';
import commentRouter from '../router/comment';
import reservationRouter from '../router/reservation';
import { sequelize } from '../models';

const app = express();

const local = 'http://localhost:4000';
const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
const HOST: string = process.env.HOST || 'localhost';

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

// 중첩 경로 생성시 새로운 router를 만들어줘야하는가?
// app.use('/shop/:id/menu/') ...와 같이 새로운 경로를 만들어줘야하는지?

app.listen('4000', () => {
  console.log('Hello World');
});

app.listen(PORT, HOST, async () => {
  console.log(`Server Listening on ${HOST}:${PORT}`);

  // //sequelize-db 연결 테스트
  await sequelize
    .authenticate()
    .then(async () => {
      console.log('connection success');
    })
    .catch((e) => {
      console.log('TT : ', e);
    });
});

export default app;
