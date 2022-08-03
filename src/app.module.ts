import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://<username>:<password>@cluster.8acgf.mongodb.net/nestjs-api?retryWrites=true',
    ),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
