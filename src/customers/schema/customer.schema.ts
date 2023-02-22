import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Customers {
  @Prop()
  names: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  companyName: string;

  @Prop()
  description: string;

  @Prop()
  filePrd: string;
}

export const CustomersSchema = SchemaFactory.createForClass(Customers);
