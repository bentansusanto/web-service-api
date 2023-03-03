import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DestinationController } from './destination.controller';
import { DestinationService } from './destination.service';
import { Destination, DestinationsSchema } from './entities/destination.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Destination.name, schema: DestinationsSchema },
    ]),
  ],
  controllers: [DestinationController],
  providers: [DestinationService],
})
export class DestinationModule {}
