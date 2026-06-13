import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Cat } from '../../cats/entities/cat.entity'; 
import { StatusType } from '../../../../enums/StatusType';

@Entity('statuses')
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  status: string;

  @Column({ type: 'varchar', length: 8, nullable: true })
  color?: string;

  @Column({
    type: 'enum',
    enum: StatusType,
  })
  type: StatusType;

  // @OneToMany(() => Cat, (cat) => cat.status)
  // cats?: Cat[];
}
