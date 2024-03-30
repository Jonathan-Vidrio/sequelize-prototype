import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @Inject('AUTHOR_REPOSITORY')
    private authorRepository: typeof Author,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return await this.authorRepository.create<Author>({ ...createAuthorDto });
  }

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.findAll<Author>({
      include: [{ all: true }],
    });
  }

  async findOne(id: number): Promise<Author> {
    return await this.authorRepository.findByPk<Author>(id, {
      include: [{ all: true }],
    });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const updatedAuthor = await this.findOne(id);

    if (updatedAuthor) {
      await updatedAuthor.update({ ...updateAuthorDto });
    }

    return await this.findOne(id);
  }
  async remove(id: number): Promise<Author> {
    const deletedAuthor = await this.findOne(id);

    if (deletedAuthor) {
      await deletedAuthor.destroy();
    }

    return deletedAuthor;
  }
}
