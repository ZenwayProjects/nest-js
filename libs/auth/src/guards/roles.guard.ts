import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import User from '@/db/entities/user';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      ctx.getHandler(),
    );
    if (!requiredRoles) return true;

    const { user }: { user: User } = ctx.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}
