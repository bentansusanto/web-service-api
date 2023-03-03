import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Destination {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  place: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  rating: string;
}

export const DestinationsSchema = SchemaFactory.createForClass(Destination);
