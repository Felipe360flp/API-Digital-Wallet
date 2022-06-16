import { Module } from '@nestjs/common';
import { UserController } from './Controllers.users';
import { UserService } from './service.users';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule,PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
