import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Status } from '../../status/entities/status.entity';

@Table({ tableName: 'Authors' })
export class Author extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  Id: number;

  @Column({ allowNull: false })
  FirstName: string;

  @Column({ allowNull: false })
  LastName: string;

  @Column({ unique: true, allowNull: false })
  Pseudonym: string;

  @Column({ allowNull: false })
  BirthDate: Date;

  @Column({ allowNull: false })
  Nationality: string;

  @ForeignKey(() => Status)
  @Column({ defaultValue: 1, allowNull: false })
  StatusId: number;

  @BelongsTo(() => Status)
  Status: Status;
}
