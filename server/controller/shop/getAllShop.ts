import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import Shop from '../../models/shops';
import comments from '../../models/comments';
import menus from '../../models/menus';

const getAllShop = {
  getAllShop: async (req: Request, res: Response) => {
    try {
      const shopCheck = await Shop.findAll({
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: comments,
            attributes: ['point'],
          },
          {
            model: menus,
            attributes: ['menuName', 'price'],
          },
        ],
      });
      return res.status(200).json({ data: shopCheck, message: '전체 조회' });
    } catch (err) {
      return res.status(500).json({ message: '서버 에러' });
    }
  },
};

export default getAllShop;
