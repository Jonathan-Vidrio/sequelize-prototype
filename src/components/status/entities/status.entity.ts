import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

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
}
