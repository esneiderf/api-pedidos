import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Pedido } from './pedido.entity';
import { CreatePedidoDto } from './create-pedido.dto';
import { UpdatePedidoDto } from './update-pedido.dto';
import { Usuario } from '../usuario/usuario.entity';
import { Producto } from '../producto/producto.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepo: Repository<Pedido>,

    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,

    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
  ) {}

  async create(dto: CreatePedidoDto): Promise<Pedido> {
    const usuario = await this.usuarioRepo.findOneBy({ id: dto.usuarioId });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const productos = await this.productoRepo.findBy({ id: In(dto.productosIds) });
    if (!productos.length) throw new NotFoundException('Productos no encontrados');

    const pedido = this.pedidoRepo.create({
      fecha: dto.fecha,
      estado: dto.estado,
      usuario,
      productos,
    });

    return this.pedidoRepo.save(pedido);
  }

  findAll(): Promise<Pedido[]> {
    return this.pedidoRepo.find();
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepo.findOne({ where: { id } });
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    return pedido;
  }

  async update(id: number, dto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id);

    if (dto.usuarioId) {
      const usuario = await this.usuarioRepo.findOneBy({ id: dto.usuarioId });
      if (!usuario) throw new NotFoundException('Usuario no encontrado');
      pedido.usuario = usuario;
    }

    if (dto.productosIds) {
      const productos = await this.productoRepo.findBy({ id: In(dto.productosIds) });
      pedido.productos = productos;
    }

    Object.assign(pedido, dto);
    return this.pedidoRepo.save(pedido);
  }

  async remove(id: number): Promise<void> {
    const pedido = await this.findOne(id);
    await this.pedidoRepo.remove(pedido);
  }
}

