import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("booking_locks")
export class BookingLock {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  serviceId: string;

  @Column("timestamptz")
  start: Date;

  @Column("timestamptz")
  end: Date;

  @Column("timestamptz")
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
