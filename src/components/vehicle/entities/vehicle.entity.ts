import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { VehicleType } from '../../../utils/enum/vehicle-type.enum';
import { Department } from '../../../utils/enum/department.enum';
import { Status } from '../../../utils/enum/status.enum';

@Table({ tableName: 'Vehicles' })
export class Vehicle extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  Id: number;

  @Column({ unique: true })
  LicensePlates: string;

  @Column
  Image: string;

  @Column({ type: DataType.ENUM(...Object.values(VehicleType)) })
  VehicleType: VehicleType;

  @Column
  Brand: string;

  @Column
  Model: string;

  @Column({ unique: true })
  SerialNumber: string;

  @Column
  Color: string;

  @Column({ type: DataType.ENUM(...Object.values(Department)) })
  Department: Department;

  @Column({
    type: DataType.ENUM(...Object.values(Status)),
    defaultValue: Status.ACTIVE,
  })
  Status: Status;
}
