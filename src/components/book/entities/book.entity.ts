import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Author } from '../../author/entities/author.entity';
import { Editorial } from '../../editorial/entities/editorial.entity';
import { Category } from '../../category/entities/category.entity';
import { Status } from '../../status/entities/status.entity';
import { Language } from '../../language/entities/language.entity';

@Table({ tableName: 'Books' })
export class Book extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  Id: number;

  @Column({ unique: true, allowNull: false })
  ISBN: string;

  @Column({ allowNull: false })
  Title: string;

  @Column({ allowNull: false })
  Subtitle: string;

  @Column({ allowNull: false })
  PublishDate: Date;

  @Column({ allowNull: false })
  Pages: number;

  @Column({ allowNull: false })
  Description: string;

  @ForeignKey(() => Author)
  @Column({ allowNull: false })
  AuthorId: number;

  @ForeignKey(() => Editorial)
  @Column({ allowNull: false })
  EditorialId: number;

  @ForeignKey(() => Category)
  @Column({ allowNull: false })
  CategoryId: number;

  @ForeignKey(() => Language)
  @Column({ allowNull: false })
  LanguageId: number;

  @ForeignKey(() => Status)
  @Column({ defaultValue: 1, allowNull: false })
  StatusId: number;

  @BelongsTo(() => Author)
  Author: Author;

  @BelongsTo(() => Editorial)
  Editorial: Editorial;

  @BelongsTo(() => Category)
  Category: Category;

  @BelongsTo(() => Language)
  Language: Language;

  @BelongsTo(() => Status)
  Status: Status;
}
