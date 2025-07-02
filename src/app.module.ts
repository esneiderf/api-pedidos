import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Usuario } from './usuario/usuario.entity';
import { Pedido } from './pedido/pedido.entity';
import { Producto } from './producto/producto.entity';
import { Categoria } from './categoria/categoria.entity';

import { UsuarioModule } from './usuario/usuario.module';
import { PedidoModule } from './pedido/pedido.module';
import { ProductoModule } from './producto/producto.module';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Usuario, Pedido, Producto, Categoria],
      synchronize: true, // solo para desarrollo
    }),
    UsuarioModule,
    PedidoModule,
    ProductoModule,
    CategoriaModule,
  ],
})
export class AppModule {}

