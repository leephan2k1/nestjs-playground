import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/models/User.model';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
