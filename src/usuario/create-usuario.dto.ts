import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @Length(2, 50)
  nombre: string;

  @IsEmail()
  correo: string;
}
