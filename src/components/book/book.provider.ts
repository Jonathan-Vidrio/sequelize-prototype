import { Book } from './entities/book.entity';

export const BookProvider = [
  {
    provide: 'BOOK_REPOSITORY',
    useValue: Book,
  },
];
