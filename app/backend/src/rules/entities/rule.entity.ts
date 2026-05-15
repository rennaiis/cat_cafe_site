import { Column, Entity, PrimaryGeneratedColumn } from "typeorm/browser";

@Entity('rules')
export class Rule {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    text: string;

    @Column('text')
    category: string;   
}
