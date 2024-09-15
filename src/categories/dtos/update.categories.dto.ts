import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateCategories {
  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>;
}

export interface Event {
  name: string;
  operation: string;
  value: number;
}
