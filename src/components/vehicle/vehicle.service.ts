import { Inject, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @Inject('VEHICLE_REPOSITORY')
    private vehicleRepository: typeof Vehicle,
  ) {}

  create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehicleRepository.create<Vehicle>(createVehicleDto);
  }

  findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.findAll<Vehicle>();
  }

  findOne(id: number): Promise<Vehicle> {
    return this.vehicleRepository.findOne<Vehicle>({ where: { id } });
  }

  async update(
    id: number,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<number> {
    const [affectedCount] = await this.vehicleRepository.update<Vehicle>(
      updateVehicleDto,
      {
        where: { id },
      },
    );

    return affectedCount;
  }

  remove(id: number): Promise<number> {
    return this.vehicleRepository.destroy({ where: { id } });
  }
}
