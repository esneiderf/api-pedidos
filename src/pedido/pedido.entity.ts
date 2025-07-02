import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Producto } from '../producto/producto.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column()
  estado: string;

  @ManyToOne(() => Usuario, usuario => usuario.pedidos, { eager: true })
  usuario: Usuario;

  @ManyToMany(() => Producto, { eager: true })
  @JoinTable()
  productos: Producto[];
}

