import { Category } from './entities/category.entity';

export const CategoryProvider = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useValue: Category,
  },
];
