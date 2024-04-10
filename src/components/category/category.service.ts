import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Book } from '../book/entities/book.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.create({
      ...createCategoryDto,
    });
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll({
      include: [{ model: Book, as: 'Books' }],
    });
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoryRepository.findByPk(id, {
      include: [{ model: Book, as: 'Books' }],
    });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findByPk(id);

    if (category) {
      await category.update(updateCategoryDto);

      return category;
    }
  }

  async remove(id: number): Promise<Category> {
    const category = await this.categoryRepository.findByPk(id);

    if (category) {
      await category.destroy();

      return category;
    }
  }
}
