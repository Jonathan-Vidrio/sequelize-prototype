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

@Table({ tableName: 'Categories' })
export class Category extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  Id: number;

  @Column({ unique: true, allowNull: false })
  Name: string;

  @Column({ allowNull: false })
  Description: string;

  @ForeignKey(() => Status)
  @Column({ defaultValue: 1, allowNull: false })
  StatusId: number;

  @BelongsTo(() => Status)
  Status: Status;
}
