import { Role } from '@/db/enums/role.enum';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    role: Role;
  };
}
