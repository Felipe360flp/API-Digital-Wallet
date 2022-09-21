import { UnauthorizedException } from '@nestjs/common';
import { Category } from 'src/Category/entities/category-entity';


export  function isAdmin(Title:string) {
   if (Title != "ADMIN") {
    throw new UnauthorizedException('Você não tem permissão para executar esta tarefa!');
  }
}


