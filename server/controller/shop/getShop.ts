import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import Shop from '../../models/shops';
import comments from '../../models/comments';
import menus from '../../models/menus';
import users from '../../models/users';

const getShop = {
  getShop: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const shopSpecificCheck = await Shop.findOne({
        attributes: [
          'shopBranch',
          'shopImage',
          'intro',
          'businessHour',
          'mainAddress',
          'detailAddress',
          'shopNumber',
          'hashTag',
        ],
        where: { id },
        include: [
          {
            model: comments,
            attributes: ['point', 'comment', 'createdAt'],
            include: [
              {
                model: menus,
                attributes: ['menuName'],
              },
              {
                // 상황에 따라 model: menus 밑에 users를 올려야할 수 있습니다. 확인 후 수정 예정
                model: users,
                attributes: ['name'],
              },
            ],
          },
          {
            model: menus,
            attributes: ['menuName', 'menuImage', 'price'],
          },
        ],
      });
      // 상황에 따라 완전 세분화 필요합니다. (댓글의 경우 특정 댓글이 아니기 때문에, findAll 필요)
      if (shopSpecificCheck) {
        return res.status(200).json({ shopSpecificCheck });
      } else {
        return res.status(401).json({ message: '자료 없음..' });
      }
    } catch (err) {
      return res.status(500).json({ message: '서버 에러' });
    }
  },
};

export default getShop;
