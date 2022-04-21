import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';

class users extends Model {
  public readonly id!: number;
  public email!: string;
  public name!: string;
  public password!: string;
  public phoneNumber!: string;
  public role!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // 필수
      unique: true, // 고유한 값
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },

  {
    sequelize,
    modelName: 'users',
    tableName: 'users',
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글이 저장
    freezeTableName: true,
    timestamps: true,
    updatedAt: 'updateTimestamp',
  },
);

export const associate = (db: dbType) => {
  db.users.hasMany(db.shops, {
    foreignKey: 'userId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  db.users.hasMany(db.menus, {
    foreignKey: 'userId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  db.users.hasMany(db.reservations, {
    foreignKey: 'userId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  db.users.hasMany(db.comments, {
    foreignKey: 'userId',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export default users;
