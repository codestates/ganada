import express from 'express';
const reservationRouter = express.Router();

const modifyReservation = require('../controller/reservation/modifyReservation');
const deleteReservation = require('../controller/reservation/deleteReservation');
const getReservation = require('../controller/reservation/getReservation');

reservationRouter.patch('/:id', modifyReservation);
reservationRouter.delete('/:id', deleteReservation);
reservationRouter.get('/', getReservation);

// 직관적으로 cancelReservation이 나은지 이야기해보기

export default reservationRouter;

// 사진관 예약 API 경로에 대해서 이야기해보기
// 사진관 예약과 같이 2중 경로를 통하는 경우 별도의 api가 필요한지 확인이 필요하다.
