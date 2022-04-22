import express from 'express';
const shopRouter = express.Router();

import getAllShop from '../controller/shop/getAllShop';
import getShop from '../controller/shop/getShop';

const registerShop = require('../controller/shop/registerShop');
const modifyShop = require('../controller/shop/modifyShop');
const deleteShop = require('../controller/shop/deleteShop');
const addMenu = require('../controller/shop/addMenu');
const getMenu = require('../controller/shop/getMenu');
const reservationStudio = require('../controller/shop/reservationStudio');

shopRouter.get('/', getAllShop.getAllShop);
shopRouter.get('/:id', getShop.getShop);
shopRouter.post('/', registerShop);
shopRouter.patch('/:id', modifyShop);
shopRouter.delete('/:id', deleteShop);

// 메뉴 조회, 메뉴 추가
shopRouter.post('/:id/menu', addMenu);
shopRouter.get('/:id/menu/:id', getMenu);

// 사진관 예약
shopRouter.post('/:id/menu/:id/reservation', reservationStudio);

export default shopRouter;
