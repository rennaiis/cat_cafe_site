import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cat } from "../../cats/entities/cat.entity";
import { FileEntity } from "../../files/entities/file.entity";
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

    @OneToOne(() => FileEntity, (file)=>file.colorType, {nullable: false})
    @JoinColumn({ name: 'file_id' })
    file: FileEntity;
    
}
