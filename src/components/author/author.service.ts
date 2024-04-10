import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { Book } from '../book/entities/book.entity';

@Injectable()
export class AuthorService {
  constructor(
    @Inject('AUTHOR_REPOSITORY')
    private authorRepository: typeof Author,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return await this.authorRepository.create({
      ...createAuthorDto,
    });
  }

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.findAll({
      include: [{ model: Book, as: 'Books' }],
    });
  }

  async findOne(id: number): Promise<Author> {
    return await this.authorRepository.findByPk(id, {
      include: [{ model: Book, as: 'Books' }],
    });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.authorRepository.findByPk(id);

    if (author) {
      await author.update({ ...updateAuthorDto });

      return author;
    }
  }

  async remove(id: number): Promise<Author> {
    const author = await this.authorRepository.findByPk(id);

    if (author) {
      await author.destroy();

      return author;
    }
  }
}
