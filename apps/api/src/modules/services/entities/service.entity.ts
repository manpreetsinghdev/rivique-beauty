import {
  Column, CreateDateColumn, Entity,
  OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from "typeorm";
import { ServiceCategory } from "@rivique/shared";
import { Booking } from "../../bookings/entities/booking.entity";

@Entity("services")
export class Service {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  name: string;

  @Column({ type: "enum", enum: ServiceCategory })
  category: ServiceCategory;

  @Column("text")
  description: string;

  @Column()
  shortDescription: string;

  @Column("int")
  duration: number;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column({ default: "USD" })
  currency: string;

  @Column("text", { array: true, default: [] })
  images: string[];

  @Column("text", { array: true, default: [] })
  tags: string[];

  @Column({ default: false })
  featured: boolean;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Booking, (booking) => booking.service)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
