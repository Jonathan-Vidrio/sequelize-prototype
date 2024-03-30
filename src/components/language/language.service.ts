import { Inject, Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguageService {
  constructor(
    @Inject('LANGUAGE_REPOSITORY')
    private languageRepository: typeof Language,
  ) {}

  async create(createLanguageDto: CreateLanguageDto): Promise<Language> {
    return await this.languageRepository.create<Language>({
      ...createLanguageDto,
    });
  }

  async findAll(): Promise<Language[]> {
    return await this.languageRepository.findAll<Language>({
      include: [{ all: true }],
    });
  }

  async findOne(id: number): Promise<Language> {
    return await this.languageRepository.findByPk(id, {
      include: [{ all: true }],
    });
  }

  async update(
    id: number,
    updateLanguageDto: UpdateLanguageDto,
  ): Promise<Language> {
    const updatedLanguage = await this.findOne(id);

    if (updatedLanguage) {
      await updatedLanguage.update(updateLanguageDto);
    }

    return await this.findOne(id);
  }

  async remove(id: number): Promise<Language> {
    const deletedLanguage = await this.findOne(id);

    if (deletedLanguage) {
      await deletedLanguage.destroy();
    }

    return deletedLanguage;
  }
}
