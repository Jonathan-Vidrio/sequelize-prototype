import { Vehicle } from './entities/vehicle.entity';

export const VehicleProvider = [
  {
    provide: 'VEHICLE_REPOSITORY',
    useValue: Vehicle,
  },
];
