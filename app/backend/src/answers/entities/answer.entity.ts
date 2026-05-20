import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm/browser";
import { Question } from "../../questions/entities/question.entity";
import { AdoptApplication } from "../../adopt_applications/entities/adopt_application.entity";

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  answer: string;

  @Column({ name: 'question_id' })
  question_id: number;

  @Column({ name: 'application_id' })
  application_id: number;

  @ManyToOne(() => Question, {nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @ManyToOne(() => AdoptApplication, (adopt_application)=>adopt_application.answers, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application_id' })
  application: AdoptApplication;
}