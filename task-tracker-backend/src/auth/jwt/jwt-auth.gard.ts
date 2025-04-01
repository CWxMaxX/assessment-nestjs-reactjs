import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { path, method } = request;

    // Allow access to login endpoint
    if (path === '/auth/login') {
      return true;
    }

    return super.canActivate(context);
  }
}
