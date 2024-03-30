import { Author } from './entities/author.entity';

export const AuthorProvider = [
  {
    provide: 'AUTHOR_REPOSITORY',
    useValue: Author,
  },
];
