import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { Email, Password } = loginDto;
    console.log(`dto.. ${Email} - ${Password}`);

    const user = await this.prisma.user.findUnique({ where: { Email } });
    console.log(`User: ${user.Email}`);

    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    const isHashValid = await bcrypt.compare(Password, user.Password);
    console.log(`hash :${isHashValid}`);

    if (!isHashValid) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    delete user.Password;

    return {
      token: this.jwtService.sign({ Email }),
      user: undefined,
    };
  }
}
