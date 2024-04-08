import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private bookRepository: typeof Book,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = await this.bookRepository.create<Book>({ ...createBookDto });

    return await this.findOne(book.Id);
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.findAll<Book>({
      attributes: {
        exclude: [
          'AuthorId',
          'CategoryId',
          'EditorialId',
          'LanguageId',
          'StatusId',
        ],
      },
      include: [{ all: true }],
    });
  }

  async findOne(id: number): Promise<Book> {
    return await this.bookRepository.findByPk<Book>(id, {
      attributes: {
        exclude: [
          'AuthorId',
          'CategoryId',
          'EditorialId',
          'LanguageId',
          'StatusId',
        ],
      },
      include: [{ all: true }],
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.findOne(id);

    if (updatedBook) {
      await updatedBook.update({ ...updateBookDto });
    }

    return await this.findOne(id);
  }

  async remove(id: number): Promise<Book> {
    const deletedBook = await this.findOne(id);

    if (deletedBook) {
      await deletedBook.destroy();
    }

    return deletedBook;
  }
}
