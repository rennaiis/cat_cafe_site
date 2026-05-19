import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Adopter } from "../../adopters/entities/adopter.entity";
import { Answer } from "../../answers/entities/answer.entity";

@Entity()
export class AdoptApplication {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=>Adopter, (adopter)=>adopter.adopt_applications, {nullable: false})
    @JoinColumn({name: 'adopter_id'})
    adopter: Adopter

    @OneToMany(()=>Answer, (answer)=>answer.adopt_application)
    answers?: Answer[]
}
