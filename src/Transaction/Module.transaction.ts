import { Module } from '@nestjs/common';
import { TransactionController } from './Controllers.transaction';
import { TransactionService } from './Service.transaction';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule,PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
