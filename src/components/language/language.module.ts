import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { DatabaseModule } from '../../database/database.module';
import { LanguageProvider } from './language.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [LanguageController],
  providers: [...LanguageProvider, LanguageService],
})
export class LanguageModule {}
