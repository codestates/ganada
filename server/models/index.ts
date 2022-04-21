import { Sequelize } from 'sequelize';
import config from '../config/config';
import users, { associate as associateusers } from './users';
import shops, { associate as associateshops } from './shops';
import menus, { associate as associatemenus } from './menus';
import comments, { associate as associatecomments } from './comments';
import reservations, {
  associate as associatereservations,
} from './reservations';

export * from './sequelize';

const db = {
  users,
  shops,
  menus,
  comments,
  reservations,
};
export type dbType = typeof db;

associateusers(db);
associateshops(db);
associatemenus(db);
associatecomments(db);
associatereservations(db);
