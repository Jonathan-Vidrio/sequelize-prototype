import { Inject, Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {
  constructor(
    @Inject('STATUS_REPOSITORY')
    private statusRepository: typeof Status,
  ) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    return await this.statusRepository.create<Status>({ ...createStatusDto });
  }

  async findAll(): Promise<Status[]> {
    return await this.statusRepository.findAll<Status>();
  }

  async findOne(id: number): Promise<Status> {
    return await this.statusRepository.findByPk<Status>(id, {
      include: [{ all: true }],
    });
  }

  async update(id: number, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const updatedStatus = await this.findOne(id);

    if (updatedStatus) {
      await updatedStatus.update({ ...updateStatusDto });
    }

    return await this.findOne(id);
  }

  async remove(id: number): Promise<Status> {
    const deletedStatus = await this.findOne(id);

    if (deletedStatus) {
      await deletedStatus.destroy();
    }

    return deletedStatus;
  }
}
