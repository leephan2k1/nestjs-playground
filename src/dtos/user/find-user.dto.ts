import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './create-user.dto';

export class FindUserByEmailDto extends PickType(UserDto, ['email'] as const) {}
