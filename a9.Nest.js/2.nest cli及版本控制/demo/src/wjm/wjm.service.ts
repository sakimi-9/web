import { Injectable } from '@nestjs/common';
import { CreateWjmDto } from './dto/create-wjm.dto';
import { UpdateWjmDto } from './dto/update-wjm.dto';

@Injectable()
export class WjmService {
  create(createWjmDto: CreateWjmDto) {
    return 'This action adds a new wjm';
  }

  findAll() {
    return `This action returns all wjm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wjm`;
  }

  update(id: number, updateWjmDto: UpdateWjmDto) {
    return `This action updates a #${id} wjm`;
  }

  remove(id: number) {
    return `This action removes a #${id} wjm`;
  }
}
