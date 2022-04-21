import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';

class comments extends Model {
  public readonly id!: number;
  public comment!: string;
  public point!: number;
  public commentImage!: string;
  public userId!: number;
  public menuId!: number;
  public shopId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentImage: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: 'comments',
    tableName: 'comments',
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글이 저장
    freezeTableName: true,
    timestamps: true,
    updatedAt: 'updateTimestamp',
  },
);

export const associate = (db: dbType) => {
  comments.belongsTo(db.users, {
    foreignKey: 'userId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  comments.belongsTo(db.menus, {
    foreignKey: 'menuId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  comments.belongsTo(db.shops, {
    foreignKey: 'shopId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export default comments;
