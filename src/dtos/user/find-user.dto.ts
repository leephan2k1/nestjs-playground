import { PickType } from '@nestjs/swagger';
import { UserDto } from './create-user.dto';

export class FindUserByEmailDto extends PickType(UserDto, ['email'] as const) {}
