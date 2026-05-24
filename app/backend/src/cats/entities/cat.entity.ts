import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ColorType } from "../../color_types/entities/color_type.entity";
import { Status } from "../../statuses/entities/status.entity";
import { Adopter } from "../../adopters/entities/adopter.entity";
import { CatGender } from "../../../../enums/CatGender";
import { FileEntity } from "../../files/entities/file.entity";
import { AdoptApplication } from "../../adopt_applications/entities/adopt_application.entity";
import { application } from "express";
@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 100})
    name: string

    @Column({type: 'enum', enum: CatGender})
    gender: CatGender

    @Column({type: 'text', nullable: true})
    description?: string

    @Column({type: 'varchar', nullable: true, length: 100})
    breed?: string

    @Column({type: 'date', nullable: true})
    birth_date?: Date

    @Column({type: 'date', nullable: true})
    accept_date?: Date

    @Column({type: 'date', nullable: true})
    adopt_date?: Date

    @ManyToOne(()=> ColorType, (colorType)=>colorType.id, {nullable: false})
    @JoinColumn({name: 'color_type_id'})
    color_type?: ColorType
    
    @ManyToOne(()=>Status, (status)=>status.id, {nullable: false})
    @JoinColumn({name: 'status_id'})
    status: Status

    @ManyToOne(()=>Adopter, (adopter)=>adopter.cats)
    @JoinColumn({name: 'adopter_id'})
    adopter?: Adopter

    @OneToMany(()=>FileEntity, (file)=>file.cat)
    files: FileEntity[]

    @OneToMany(()=>AdoptApplication, (application)=>application.cat)
    adopt_applications: AdoptApplication[]
    
}
