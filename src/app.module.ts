import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/product/product.module';
import databaseConfig from './config/database.config';
import { Product } from './modules/product/entities/product.entity';

console.log('test  ::  ', databaseConfig);
@Module({
  imports: [
    TypeOrmModule.forRoot({ ...databaseConfig, entities: [Product] }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
