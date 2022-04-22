import express from 'express';
const userRouter = express.Router();

const getUser = require('../controller/user/getUser');
const modifyUser = require('../controller/user/modifyUser');
const deleteUser = require('../controller/user/deleteUser');

userRouter.get('/', getUser);
userRouter.patch('/', modifyUser);
userRouter.delete('/', deleteUser);

export default userRouter;
