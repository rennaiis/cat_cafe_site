import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Answer } from '../../answers/entities/answer.entity'; // Скорректируйте путь, если нужно

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  question_text: string;

  @Column('boolean')
  is_mandatory: boolean;

  @Column('boolean')
  is_open: boolean;

  @Column('boolean')
  one_answer: boolean;

  @Column('simple-array', { nullable: true })
  variants?: string[];
}
