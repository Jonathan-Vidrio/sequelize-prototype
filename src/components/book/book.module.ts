import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DatabaseModule } from '../../database/database.module';
import { BookProvider } from './book.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [BookController],
  providers: [...BookProvider, BookService],
})
export class BookModule {}
