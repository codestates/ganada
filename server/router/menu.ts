import express from 'express';
const menuRouter = express.Router();

const deleteMenu = require('../controller/menu/deleteMenu');
const modifyMenu = require('../controller/menu/modifyMenu');
const writeComment = require('../controller/menu/writeComment');
const deleteComment = require('../controller/menu/deleteComment');

menuRouter.delete('/:id', deleteMenu);
menuRouter.patch('/:id', modifyMenu);

// 댓글 작성, 댓글 삭제
menuRouter.post('/:id/comment', writeComment);
menuRouter.delete('/:id/comment', deleteComment);

export default menuRouter;
