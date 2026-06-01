import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../../../../enums/UserRole";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type: 'varchar', unique: true, length: 100})
    login: string

    @Column({ type: 'text' })
    password_hash: string;

    @Column({
        type: 'enum', 
        enum: UserRole
    })
    role: UserRole

}
