import { IsNotEmpty, IsDateString, IsString, IsArray, IsNumber } from 'class-validator';

export class CreatePedidoDto {
  @IsDateString()
  fecha: Date;

  @IsString()
  estado: string;

  @IsNumber()
  usuarioId: number;

  @IsArray()
  @IsNumber({}, { each: true })
  productosIds: number[];
}
