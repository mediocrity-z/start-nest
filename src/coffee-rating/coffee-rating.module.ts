import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { DatabaseModule } from 'src/database/database.module';

class MockCoffeesService {}

@Module({
  providers: [
    { provide: CoffeeRatingService, useValue: new MockCoffeesService() },
  ],
  imports: [CoffeesModule],
})
export class CoffeeRatingModule {}
