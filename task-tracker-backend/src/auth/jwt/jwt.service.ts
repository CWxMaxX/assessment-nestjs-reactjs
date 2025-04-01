import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'f56bdc4456193e61ae82fbbe33dd8580f1de8134eab112fe13651865374f61940edfa7a5fcae5380eada4c6d5c58622890e77be25703cd7dd71be08b1038db0f',
    });
    console.log("JWT_SRC", process.env.JWT_SECRET);
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}