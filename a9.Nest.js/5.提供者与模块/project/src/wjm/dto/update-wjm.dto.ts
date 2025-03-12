import { PartialType } from '@nestjs/mapped-types';
import { CreateWjmDto } from './create-wjm.dto';

export class UpdateWjmDto extends PartialType(CreateWjmDto) {}
