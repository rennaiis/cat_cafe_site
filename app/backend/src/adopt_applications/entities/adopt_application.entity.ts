import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Adopter } from "../../adopters/entities/adopter.entity";
import { Answer } from "../../answers/entities/answer.entity";
import { Cat } from "../../cats/entities/cat.entity";
import { ApplicationStatus } from "../../../../enums/ApplicationStatus";

@Entity()
export class AdoptApplication {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=>Adopter, (adopter)=>adopter.adopt_applications, {nullable: false})
    @JoinColumn({name: 'adopter_id'})
    adopter: Adopter

    @OneToMany(()=>Answer, (answer)=>answer.adopt_application)
    answers?: Answer[]

    @ManyToOne(()=>Cat, (cat)=>cat.adopt_applications, {nullable: false})
    cat: Cat

    @Column({
        type: 'enum', 
        enum: ApplicationStatus
    })
    application_status: ApplicationStatus

}
