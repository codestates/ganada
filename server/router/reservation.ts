import express from 'express';
const reservationRouter = express.Router();

const modifyReservation = require('../controller/reservation/modifyReservation');
const deleteReservation = require('../controller/reservation/deleteReservation');
const getReservation = require('../controller/reservation/getReservation');

reservationRouter.patch('/:id', modifyReservation);
reservationRouter.delete('/:id', deleteReservation);
reservationRouter.get('/', getReservation);

// 사진관 예약은 경로 시작이 shop이라 shop으로 이동

export default reservationRouter;
