import { Inject, Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';
import { Book } from '../book/entities/book.entity';

@Injectable()
export class StatusService {
  constructor(
    @Inject('STATUS_REPOSITORY')
    private statusRepository: typeof Status,
  ) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    return await this.statusRepository.create({ ...createStatusDto });
  }

  async findAll(): Promise<Status[]> {
    return await this.statusRepository.findAll({
      include: [{ model: Book, as: 'Books' }],
    });
  }

  async findOne(id: number): Promise<Status> {
    return await this.statusRepository.findByPk(id, {
      include: [{ model: Book, as: 'Books' }],
    });
  }

  async update(id: number, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const status = await this.statusRepository.findByPk(id);

    if (status) {
      await status.update({ ...updateStatusDto });

      return status;
    }
  }

  async remove(id: number): Promise<Status> {
    const status = await this.statusRepository.findByPk(id);

    if (status) {
      await status.destroy();

      return status;
    }
  }
}
