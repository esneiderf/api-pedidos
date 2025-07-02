import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { Usuario } from '../usuario/usuario.entity';
import { Producto } from '../producto/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, Usuario, Producto])],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}

