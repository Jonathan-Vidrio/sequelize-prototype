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
    await this.languageRepository.create<Language>({
      ...createLanguageDto,
    });

    return await this.findOne(createLanguageDto.Id);
  }

  async findAll(): Promise<Language[]> {
    return await this.languageRepository.findAll<Language>({
      attributes: { exclude: ['StatusId'] },
      include: [{ all: true }],
    });
  }

  async findOne(id: number): Promise<Language> {
    return this.languageRepository.findByPk(id, {
      attributes: { exclude: ['StatusId'] },
      include: [{ all: true }],
    });
  }

  async update(
    id: number,
    updateLanguageDto: UpdateLanguageDto,
  ): Promise<Language> {
    const language = await this.findOne(id);

    if (language) {
      await language.update(updateLanguageDto);

      return await this.findOne(id);
    }
  }

  async remove(id: number): Promise<Language> {
    const language = await this.findOne(id);

    if (language) {
      await language.destroy();

      return language;
    }
  }
}
