import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';

class reservations extends Model {
  public readonly id!: number;
  public date!: Date;
  public time!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public userId!: number;
  public shopId!: number;
  public menuId!: number;
}

reservations.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
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
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'menus',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },

  {
    sequelize,
    modelName: 'reservations',
    tableName: 'reservations',
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글이 저장
    freezeTableName: true,
    timestamps: true,
    updatedAt: 'updateTimestamp',
  },
);

export const associate = (db: dbType) => {
  reservations.belongsTo(db.users, {
    foreignKey: 'userId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  reservations.belongsTo(db.menus, {
    foreignKey: 'menuId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  reservations.belongsTo(db.shops, {
    foreignKey: 'shopId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export default reservations;
