import { Role } from '@/db/enums/role.enum';

export type JWTTokenPayload = {
  sub: string;
  email: string;
  role?: Role;
};
