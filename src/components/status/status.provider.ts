import { Status } from './entities/status.entity';

export const StatusProvider = [
  {
    provide: 'STATUS_REPOSITORY',
    useValue: Status,
  },
];
