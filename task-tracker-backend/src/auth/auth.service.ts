import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly databaseService: DatabaseService
  ) {}

  private async findUserByUsername(username: string) {
    return this.databaseService.user.findUnique({
      where: { username },
    });
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const userData = await this.findUserByUsername(user.username);
    if (!userData) {
      throw new UnauthorizedException("User not found");
    }
    const { password, ...userDataWithoutPassword } = userData;
    return {
      access_token: this.jwtService.sign(payload),
      user: userDataWithoutPassword,
    };
  }
}
