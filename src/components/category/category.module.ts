import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DatabaseModule } from '../../database/database.module';
import { CategoryProvider } from './category.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [...CategoryProvider, CategoryService],
})
export class CategoryModule {}
