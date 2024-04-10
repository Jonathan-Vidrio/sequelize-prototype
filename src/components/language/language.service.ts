import { Inject, Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';
import { Book } from '../book/entities/book.entity';

@Injectable()
export class LanguageService {
  constructor(
    @Inject('LANGUAGE_REPOSITORY')
    private languageRepository: typeof Language,
  ) {}

  async create(createLanguageDto: CreateLanguageDto): Promise<Language> {
    return await this.languageRepository.create({
      ...createLanguageDto,
    });
  }

  async findAll(): Promise<Language[]> {
    return await this.languageRepository.findAll({
      include: [{ model: Book, as: 'Books' }],
    });
  }

  async findOne(id: number): Promise<Language> {
    return this.languageRepository.findByPk(id, {
      include: [{ model: Book, as: 'Books' }],
    });
  }

  async update(
    id: number,
    updateLanguageDto: UpdateLanguageDto,
  ): Promise<Language> {
    const language = await this.languageRepository.findByPk(id);

    if (language) {
      await language.update(updateLanguageDto);

      return language;
    }
  }

  async remove(id: number): Promise<Language> {
    const language = await this.languageRepository.findByPk(id);

    if (language) {
      await language.destroy();

      return language;
    }
  }
}
