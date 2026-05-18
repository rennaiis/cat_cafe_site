import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cat } from "../../cats/entities/cat.entity";
@Entity()
export class ColorType {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ type: 'varchar', length: 100 })
    color_type: string;

    @Column({ type: 'varchar', length: 8 })
    color: string;

    @OneToMany(() => Cat, (cat) => cat.color_type)
    cats: Cat[];

    @OneToOne(() => File)
    @JoinColumn({ name: 'file_id' })
    file: File;
    
}
