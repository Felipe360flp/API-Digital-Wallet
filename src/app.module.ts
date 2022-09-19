import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './Users/Module.users';
import { CategoryModule } from './Category/Module.category';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './Auth/Module.auth';
import { TransactionModule } from './Transaction/Module.transaction';

@Module({
  imports: [UserModule,CategoryModule,AuthModule,TransactionModule,PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
