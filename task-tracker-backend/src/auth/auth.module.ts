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
      secret:  process.env.JWT_SECRET || '', 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, DatabaseService],
  exports: [AuthService],
})
export class AuthModule {}