import express from 'express';
const authRouter = express.Router();

import personalSignup from '../controller/auth/personalSignup';
import ownerSignup from '../controller/auth/ownerSignup';

// const { personalSignup } = require('../controller/auth');
const login = require('../controller/auth/login');
const logout = require('../controller/auth/logout');
const googleCallback = require('../controller/auth/googleCallback');
const kakaoCallback = require('../controller/auth/kakaoCallback');
const naverCallback = require('../controller/auth/naverCallback');
const validateEmail = require('../controller/auth/validateEmail');

authRouter.post('/personalSignup', personalSignup.personalSignup);
authRouter.post('/ownerSignup', ownerSignup.ownerSignup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/google/callback', googleCallback);
authRouter.get('/kakao/callback', kakaoCallback);
authRouter.get('/naver/callback', naverCallback);
authRouter.post('/validate-email', validateEmail);

export default authRouter;
