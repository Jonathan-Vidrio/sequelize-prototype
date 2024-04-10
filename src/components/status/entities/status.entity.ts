import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Language } from '../../language/entities/language.entity';
import { Editorial } from '../../editorial/entities/editorial.entity';
import { Category } from '../../category/entities/category.entity';
import { Book } from '../../book/entities/book.entity';
import { Author } from '../../author/entities/author.entity';

@Table({ tableName: 'Statuses' })
export class Status extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  Id: number;

  @Column({ unique: true, allowNull: false })
  Name: string;

  @Column({ allowNull: false })
  Description: string;

  @HasMany(() => Language)
  Languages: Language[];

  @HasMany(() => Editorial)
  Editorials: Editorial[];

  @HasMany(() => Category)
  Categories: Category[];

  @HasMany(() => Author)
  Authors: Author[];

  @HasMany(() => Book)
  Books: Book[];
}
