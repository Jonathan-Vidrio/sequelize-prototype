import { Inject, Injectable } from '@nestjs/common';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';
import { Editorial } from './entities/editorial.entity';

@Injectable()
export class EditorialService {
  constructor(
    @Inject('EDITORIAL_REPOSITORY')
    private editorialRepository: typeof Editorial,
  ) {}

  async create(createEditorialDto: CreateEditorialDto): Promise<Editorial> {
    const editorial = await this.editorialRepository.create<Editorial>({
      ...createEditorialDto,
    });

    return await this.findOne(editorial.Id);
  }

  async findAll(): Promise<Editorial[]> {
    return await this.editorialRepository.findAll<Editorial>({
      attributes: { exclude: ['StatusId'] },
      include: [{ all: true }],
    });
  }

  async findOne(id: number): Promise<Editorial> {
    return await this.editorialRepository.findByPk(id, {
      attributes: { exclude: ['StatusId'] },
      include: [{ all: true }],
    });
  }

  async update(
    id: number,
    updateEditorialDto: UpdateEditorialDto,
  ): Promise<Editorial> {
    const editorial = await this.findOne(id);

    if (editorial) {
      await editorial.update(updateEditorialDto);

      return await this.findOne(id);
    }
  }

  async remove(id: number): Promise<Editorial> {
    const editorial = await this.findOne(id);

    if (editorial) {
      await editorial.destroy();

      return editorial;
    }
  }
}
