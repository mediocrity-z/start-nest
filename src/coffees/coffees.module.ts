import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { COFFEE_BRANDS } from './coffees.constant';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

class DevelopmentConfigService {}

class ProductionConfigService {}

@Injectable()
class CoffeeBrandsFactory {
  constructor(cf: CoffeesService) {}
  create() {
    return ['buddy brew', 'nescafe'];
  }
}

@Module({
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    {
      provide: COFFEE_BRANDS,
      useFactory: async (connection: Connection) => {
        const coffeesFactory = await Promise.resolve(['buddy brew', 'nescafe']);
        return coffeesFactory;
      },
      inject: [Connection],
    },
  ], // 注册全局单例
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  exports: [CoffeesService], // 导出服务，以便其他模块使用
})
export class CoffeesModule {}
