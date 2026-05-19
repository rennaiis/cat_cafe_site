import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cat } from "../../cats/entities/cat.entity";
import { AdoptApplication } from "../../adopt_applications/entities/adopt_application.entity";

@Entity()
export class Adopter {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 100})
    first_name: string

    @Column({type: 'varchar', length: 100})
    last_name: string

    @Column({type: 'varchar', length: 100, nullable: true})
    middle_name?: string

    @Column({type: 'varchar', length: 12, nullable: true})
    mobile?: string

    @Column({type: 'varchar', length: 500, nullable: true})
    email?: string

    @Column({type: 'varchar', length: 500, nullable: true})
    contact?: string

    @OneToMany(()=>Cat, (cat)=>cat.adopter)
    cats?: Cat[]

    @OneToMany(()=>AdoptApplication, (adopt_application)=>adopt_application.adopter)
    adopt_applications?: AdoptApplication[]
}
