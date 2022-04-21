import express from 'express';
const personalSignup = require('../controller/auth/personalSignup');
const ownerSignup = require('../controller/auth/ownerSignup');
const login = require('../controller/auth/login');
const logout = require('../controller/auth/logout');
const googleCallback = require('../controller/auth/googleCallback');
const kakaoCallback = require('../controller/auth/kakaoCallback');
const naverCallback = require('../controller/auth/naverCallback');
const validateEmail = require('../controller/auth/validateEmail');

const authRouter = express.Router();

authRouter.post('/personal-signup', personalSignup);
authRouter.post('/owner-signup', ownerSignup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/google/callback', googleCallback);
authRouter.get('/kakao/callback', kakaoCallback);
authRouter.get('/naver/callback', naverCallback);
authRouter.post('/validate-email', validateEmail);

export default authRouter;
