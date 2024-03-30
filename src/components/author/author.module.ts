import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { DatabaseModule } from '../../database/database.module';
import { AuthorProvider } from './author.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthorController],
  providers: [...AuthorProvider, AuthorService],
})
export class AuthorModule {}
