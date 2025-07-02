import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateProductoDto {
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsNumber()
  categoriaId: number;
}
