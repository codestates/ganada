import express from 'express';
const shopRouter = express.Router();

const getAllShop = require('../controller/shop/getAllShop');
const getShop = require('../controller/shop/getShop');
const registerShop = require('../controller/shop/registerShop');
const modifyShop = require('../controller/shop/modifyShop');
const deleteShop = require('../controller/shop/deleteShop');

shopRouter.get('/', getAllShop);
shopRouter.get('/:id', getShop);
shopRouter.post('/', registerShop);
shopRouter.patch('/:id', modifyShop);
shopRouter.delete('/:id', deleteShop);

export default shopRouter;
