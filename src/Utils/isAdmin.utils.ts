import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/Users/entities/Users.entity';
import { prisma, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';


export function isAdmin(user: User) {
  const data = user.category.Title;
   if (user.category.Title != "adm") {
    throw new UnauthorizedException('Você não tem permissão de admin');
  }
}


