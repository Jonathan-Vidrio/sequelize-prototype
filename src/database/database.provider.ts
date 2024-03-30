import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import { Book } from '../components/book/entities/book.entity';
import { Author } from '../components/author/entities/author.entity';
import { Editorial } from '../components/editorial/entities/editorial.entity';
import { Category } from '../components/category/entities/category.entity';
import { Language } from '../components/language/entities/language.entity';
import { Status } from '../components/status/entities/status.entity';
import { ConfigService } from '@nestjs/config';

export const DatabaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (configService: ConfigService) => {
      let sequelize = new Sequelize({
        dialect: configService.get<string>('DB_DIALECT') as Dialect,
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
      });

      await sequelize.query(
        `CREATE DATABASE IF NOT EXISTS \`${configService.get<string>('DB_DATABASE')}\`;`,
      );
      await sequelize.close();

      sequelize = new Sequelize({
        dialect: (configService.get<string>('DB_DIALECT') ||
          'mysql') as Dialect,
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: +configService.get<number>('DB_PORT') || 3306,
        username: configService.get<string>('DB_USERNAME') || 'root',
        password: configService.get<string>('DB_PASSWORD') || '',
        database: configService.get<string>('DB_DATABASE') || 'library',
      });

      sequelize.addModels([
        Book,
        Author,
        Editorial,
        Category,
        Language,
        Status,
      ]);

      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
