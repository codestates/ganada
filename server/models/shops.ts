import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';

class shops extends Model {
  public readonly id!: number;
  public shopBranch!: string;
  public shopImage!: string;
  public intro!: string;
  public businessHour!: Date;
  public shopNumber!: string;
  public mainAddress!: string;
  public detailAddress!: string;
  public hashTag!: string;
  public latitude!: string;
  public longitude!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public userId!: number;
}

shops.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    shopBranch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shopImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    intro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessHour: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    shopNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mainAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashTag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
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
  },

  {
    sequelize,
    modelName: 'shops',
    tableName: 'shops',
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글이 저장
    freezeTableName: true,
    timestamps: true,
    updatedAt: 'updateTimestamp',
  },
);

export const associate = (db: dbType) => {
  db.shops.belongsTo(db.users, {
    foreignKey: 'userId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  db.shops.hasMany(db.reservations, {
    foreignKey: 'shopId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  db.shops.hasMany(db.comments, {
    foreignKey: 'shopId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  db.shops.hasMany(db.menus, {
    foreignKey: 'shopId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export default shops;
