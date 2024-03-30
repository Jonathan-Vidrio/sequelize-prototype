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
    return await this.editorialRepository.create<Editorial>({
      ...createEditorialDto,
    });
  }

  async findAll(): Promise<Editorial[]> {
    return await this.editorialRepository.findAll<Editorial>({
      include: [{ all: true }],
    });
  }

  async findOne(id: number): Promise<Editorial> {
    return await this.editorialRepository.findByPk(id, {
      include: [{ all: true }],
    });
  }

  async update(
    id: number,
    updateEditorialDto: UpdateEditorialDto,
  ): Promise<Editorial> {
    const updatedEditorial = await this.findOne(id);

    if (updatedEditorial) {
      await updatedEditorial.update(updateEditorialDto);
    }

    return await this.findOne(id);
  }

  async remove(id: number): Promise<Editorial> {
    const deletedEditorial = await this.findOne(id);

    if (deletedEditorial) {
      await deletedEditorial.destroy();
    }

    return deletedEditorial;
  }
}
