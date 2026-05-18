import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "../../employees/entities/employee.entity";
import { UserRole } from "../../../../enums/UserRole";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(()=>Employee, (employee)=>employee.user, {nullable: true})
    @JoinColumn({name: 'employee'})
    employee?: Employee
    
    @Column({type: 'varchar', unique: true, length: 100})
    login: string

    @Column({ type: 'text' })
    password_hash: string;

    @Column({
        type: 'enum', 
        enum: UserRole
    })
    userRole: UserRole

}
