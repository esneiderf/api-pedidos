import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { CreateProductoDto } from './create-producto.dto';
import { UpdateProductoDto } from './update-producto.dto';
import { Categoria } from '../categoria/categoria.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,

    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,
  ) {}

  async create(dto: CreateProductoDto): Promise<Producto> {
    const categoria = await this.categoriaRepo.findOneBy({ id: dto.categoriaId });
    if (!categoria) throw new NotFoundException('Categoría no encontrada');

    const producto = this.productoRepo.create({ ...dto, categoria });
    return this.productoRepo.save(producto);
  }

  findAll(): Promise<Producto[]> {
    return this.productoRepo.find();
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepo.findOne({ where: { id } });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }

  async update(id: number, dto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);

    if (dto.categoriaId) {
      const categoria = await this.categoriaRepo.findOneBy({ id: dto.categoriaId });
      if (!categoria) throw new NotFoundException('Categoría no encontrada');
      producto.categoria = categoria;
    }

    Object.assign(producto, dto);
    return this.productoRepo.save(producto);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
    await this.productoRepo.remove(producto);
  }
}

