import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("availability_slots")
export class AvailabilitySlot {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  vendorId: string;

  @Column("timestamptz")
  start: Date;

  @Column("timestamptz")
  end: Date;

  @Column({ default: false })
  isBooked: boolean;

  @Column({ type: "json", nullable: true })
  metadata?: any;

  @CreateDateColumn()
  createdAt: Date;
}
