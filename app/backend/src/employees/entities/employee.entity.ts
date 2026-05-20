import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn({ name: 'employee_id' })
  employee_id: number;

  @Column({ type: 'varchar', length: 100 })
  first_name: string;

  @Column({ type: 'varchar', length: 100 })
  last_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  middle_name?: string;

  @Column({ type: 'varchar', length: 12 })
  phone_number: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  contact?: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  salary: number;

  @OneToOne(() => User, (user) => user.employee, {nullable: true})
  user: User;
}
