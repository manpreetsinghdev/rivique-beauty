import {
  Column, CreateDateColumn, Entity, JoinColumn,
  ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from "typeorm";
import { BookingStatus, PaymentStatus } from "@rivique/shared";
import { User }    from "../../users/entities/user.entity";
import { Service } from "../../services/entities/service.entity";
import { Payment } from "../../payments/entities/payment.entity";

@Entity("bookings")
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Service, (service) => service.bookings)
  @JoinColumn({ name: "serviceId" })
  service: Service;

  @Column()
  serviceId: string;

  @Column({ type: "enum", enum: BookingStatus, default: BookingStatus.PENDING })
  status: BookingStatus;

  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.UNPAID })
  paymentStatus: PaymentStatus;

  @Column("timestamptz")
  scheduledAt: Date;

  @Column("text", { nullable: true })
  notes?: string;

  @Column("decimal", { precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ default: "USD" })
  currency: string;

  @OneToOne(() => Payment, (payment) => payment.booking, { nullable: true })
  payment?: Payment;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
