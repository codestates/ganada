import express from 'express';
const userRouter = express.Router();

const modifyUser = require('../controller/user/modifyUser');
const deleteUser = require('../controller/user/deleteUser');
const getUser = require('../controller/user/getUser');

userRouter.patch('/', modifyUser);
userRouter.delete('/', deleteUser);
userRouter.get('/', getUser);

export default userRouter;
