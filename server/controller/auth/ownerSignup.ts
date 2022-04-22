import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import User from '../../models/users';

const ownerSignup = {
  ownerSignup: async (req: Request, res: Response) => {
    const { email, name, password, phoneNumber, role } = req.body;
    if (!email || !name || !password || !phoneNumber) {
      return res.status(422).json({ message: '필수 항목을 입력하세요.' });
    } else {
      const emailCheck = await User.findOne({
        where: { email: email },
      });
      if (emailCheck) {
        res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
      } else {
        User.create({
          email: email,
          name: name,
          password: password,
          phoneNumber: phoneNumber,
          role: 1,
        });
        res.status(200).json({ message: '가입 완료' });
      }
    }
  },
};

export default ownerSignup;
