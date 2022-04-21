import users from '../../models/users'; //방금 만들어준 user model

console.log('======Create User Table======');

const create_table_users = async () => {
  await users
    .sync({ force: true })
    .then(() => {
      console.log('✅Success Create User Table');
    })
    .catch((err: Error) => {
      console.log('❗️Error in Create User Table : ', err);
    });
};

create_table_users();
