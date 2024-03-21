import { Sequelize } from 'sequelize-typescript';
import { Vehicle } from '../components/vehicle/entities/vehicle.entity';

export const DatabaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'test',
        password: 'test',
        database: 'test',
      });
      sequelize.addModels([Vehicle]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
