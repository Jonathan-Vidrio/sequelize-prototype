import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.create<Category>({
      ...createCategoryDto,
    });

    return await this.findOne(category.Id);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll<Category>({
      attributes: { exclude: ['StatusId'] },
      include: [{ all: true }],
    });
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoryRepository.findByPk(id, {
      attributes: { exclude: ['StatusId'] },
      include: [{ all: true }],
    });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);

    if (category) {
      await category.update(updateCategoryDto);
    }

    return await this.findOne(id);
  }

  async remove(id: number): Promise<Category> {
    const category = await this.findOne(id);

    if (category) {
      await category.destroy();
    }

    return category;
  }
}
