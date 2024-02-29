// sequelize.ts
import { Sequelize, Options } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelizeOptions: Options = {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

const sequelize = new Sequelize(process.env.DATABASE_URL as string, sequelizeOptions);

// Check the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export { sequelize };
