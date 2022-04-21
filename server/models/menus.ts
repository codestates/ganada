import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';

class menus extends Model {
  public readonly id!: number;
  public menuName!: string;
  public price!: number;
  public intro!: string;
  public menuImage!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public userId!: number;
  public shopId!: number;
}

menus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    menuName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    intro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    menuImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shops',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },

  {
    sequelize,
    modelName: 'menus',
    tableName: 'menus',
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글이 저장
    freezeTableName: true,
    timestamps: true,
    updatedAt: 'updateTimestamp',
  },
);

export const associate = (db: dbType) => {
  db.menus.belongsTo(db.users, {
    foreignKey: 'userId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  db.menus.belongsTo(db.shops, {
    foreignKey: 'shopId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  db.menus.hasMany(db.comments, {
    foreignKey: 'menuId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  db.menus.hasMany(db.reservations, {
    foreignKey: 'menuId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export default menus;
