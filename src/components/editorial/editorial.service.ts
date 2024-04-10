import { Inject, Injectable } from '@nestjs/common';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';
import { Editorial } from './entities/editorial.entity';
import { Book } from '../book/entities/book.entity';

@Injectable()
export class EditorialService {
  constructor(
    @Inject('EDITORIAL_REPOSITORY')
    private editorialRepository: typeof Editorial,
  ) {}

  async create(createEditorialDto: CreateEditorialDto): Promise<Editorial> {
    return await this.editorialRepository.create({
      ...createEditorialDto,
    });
  }

  async findAll(): Promise<Editorial[]> {
    return await this.editorialRepository.findAll({
      include: [{ model: Book, as: 'Books' }],
    });
  }

  async findOne(id: number): Promise<Editorial> {
    return await this.editorialRepository.findByPk(id, {
      include: [{ model: Book, as: 'Books' }],
    });
  }

  async update(
    id: number,
    updateEditorialDto: UpdateEditorialDto,
  ): Promise<Editorial> {
    const editorial = await this.editorialRepository.findByPk(id);

    if (editorial) {
      await editorial.update(updateEditorialDto);

      return editorial;
    }
  }

  async remove(id: number): Promise<Editorial> {
    const editorial = await this.editorialRepository.findByPk(id);
    if (editorial) {
      await editorial.destroy();

      return editorial;
    }
  }
}
