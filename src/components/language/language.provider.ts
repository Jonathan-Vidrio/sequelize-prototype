import { Language } from './entities/language.entity';

export const LanguageProvider = [
  {
    provide: 'LANGUAGE_REPOSITORY',
    useValue: Language,
  },
];
