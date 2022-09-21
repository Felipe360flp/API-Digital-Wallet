import {Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/Users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;
    console.log(`dto.. ${email} - ${password}`);

    const user = await this.prisma.user.findUnique({ where: { email } });
    console.log(`User: ${user.email}`);

    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    const isHashValid = await bcrypt.compare(password, user.password);
    console.log(`hash :${isHashValid}`);

    if (!isHashValid) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({ email }),
      user:undefined,
    };
  }
}
