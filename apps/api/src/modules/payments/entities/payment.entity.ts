import {
  Column, CreateDateColumn, Entity,
  JoinColumn, OneToOne, PrimaryGeneratedColumn,
} from "typeorm";
import { PaymentStatus } from "@rivique/shared";
import { Booking } from "../../bookings/entities/booking.entity";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Booking, (booking) => booking.payment, { onDelete: "CASCADE" })
  @JoinColumn({ name: "bookingId" })
  booking: Booking;

  @Column()
  bookingId: string;

  @Column("decimal", { precision: 10, scale: 2 })
  amount: number;

  @Column({ default: "USD" })
  currency: string;

  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.UNPAID })
  status: PaymentStatus;

  @Column()
  provider: string;

  @Column({ nullable: true })
  providerPaymentId?: string;

  @CreateDateColumn()
  createdAt: Date;
}
