import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Author } from '../author/entities/author.entity';
import { Category } from '../category/entities/category.entity';
import { Editorial } from '../editorial/entities/editorial.entity';
import { Language } from '../language/entities/language.entity';
import { Status } from '../status/entities/status.entity';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private bookRepository: typeof Book,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookRepository.create({ ...createBookDto });
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.findAll({
      include: [
        { model: Author, as: 'Author' },
        { model: Category, as: 'Category' },
        { model: Editorial, as: 'Editorial' },
        { model: Language, as: 'Language' },
        { model: Status, as: 'Status' },
      ],
    });
  }

  async findOne(id: number): Promise<Book> {
    return await this.bookRepository.findByPk(id, {
      include: [
        { model: Author, as: 'Author' },
        { model: Category, as: 'Category' },
        { model: Editorial, as: 'Editorial' },
        { model: Language, as: 'Language' },
        { model: Status, as: 'Status' },
      ],
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.bookRepository.findByPk(id);

    if (updatedBook) {
      await updatedBook.update({ ...updateBookDto });

      return updatedBook;
    }
  }

  async remove(id: number): Promise<Book> {
    const deletedBook = await this.bookRepository.findByPk(id);

    if (deletedBook) {
      await deletedBook.destroy();

      return deletedBook;
    }
  }
}
