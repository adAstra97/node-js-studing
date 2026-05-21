import { IsNotEmpty, IsNumber } from 'class-validator';

type Product = {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: number;
  email: string;
  name: string;
  address: string;
  roles: string[];
};

export interface Order {
  id: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
  userId: number | null;
}

export class CreateOrderDto {
  @IsNumber()
  total: number;

  @IsNotEmpty()
  products: Product[];

  @IsNotEmpty()
  userId: number;
}

export class UpdateOrderDto {
  @IsNumber()
  total: number;

  @IsNotEmpty()
  products: Product[];

  @IsNotEmpty()
  userId: number;
}
