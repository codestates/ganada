import express from 'express';
const menuRouter = express.Router();

const deleteMenu = require('../controller/menu/deleteMenu');
const modifyMenu = require('../controller/menu/modifyMenu');

menuRouter.delete('/:id', deleteMenu);
menuRouter.patch('/:id', modifyMenu);

export default menuRouter;

// 메뉴 또한 조회와 추가는 shop으로 이동이 필요하다 생각된다.
