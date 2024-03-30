import { Editorial } from './entities/editorial.entity';

export const EditorialProvider = [
  {
    provide: 'EDITORIAL_REPOSITORY',
    useValue: Editorial,
  },
];
