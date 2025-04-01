import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.service';
import { DatabaseService } from 'src/database/database.service';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret:  process.env.JWT_SECRET || 'f56bdc4456193e61ae82fbbe33dd8580f1de8134eab112fe13651865374f61940edfa7a5fcae5380eada4c6d5c58622890e77be25703cd7dd71be08b1038db0f', 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, DatabaseService],
  exports: [AuthService],
})
export class AuthModule {}