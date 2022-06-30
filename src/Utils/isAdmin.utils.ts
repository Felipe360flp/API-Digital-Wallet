import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/Users/entities/Users.entity';


export function isAdmin(user: User) {
  if (user.category.Title != "ADMIN") {
    throw new UnauthorizedException('Você não tem permissão de admin');
  }
}
