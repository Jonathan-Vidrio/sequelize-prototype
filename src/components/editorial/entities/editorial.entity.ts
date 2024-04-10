import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Status } from '../../status/entities/status.entity';
import { Book } from '../../book/entities/book.entity';

@Table({ tableName: 'Editorials' })
export class Editorial extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  Id: number;

  @Column({ unique: true, allowNull: false })
  Name: string;

  @Column({ allowNull: false })
  Address: string;

  @Column({ allowNull: false })
  Phone: string;

  @Column({ unique: true, allowNull: false })
  Email: string;

  @Column({ unique: true, allowNull: false })
  Website: string;

  @ForeignKey(() => Status)
  @Column({ defaultValue: 1, allowNull: false })
  StatusId: number;

  @BelongsTo(() => Status)
  Status: Status;

  @HasMany(() => Book)
  Books: Book[];
}
