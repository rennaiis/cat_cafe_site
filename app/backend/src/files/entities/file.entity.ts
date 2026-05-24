import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FileType } from "../../../../enums/FileType";
import { FileCategory } from "../../../../enums/FileCategory";
import { Cat } from "../../cats/entities/cat.entity";
import { ColorType } from "../../color_types/entities/color_type.entity";

@Entity()
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    path: string;

    @Column({ type: 'text' })
    name: string;

    @Column({type: 'text', nullable: true})
    preview?: string;

    @Column({type: 'boolean', nullable: true})
    is_approved?: boolean

    @Column({
        type: 'enum',
        enum: FileType
    })
    type: FileType

    @Column({
        type: 'enum',
        enum: FileCategory,
    })
    category: FileCategory

    @ManyToOne(()=>Cat, {nullable: true, onDelete: 'SET NULL'})
    @JoinColumn({name: 'cat_id'})
    cat?: null | Cat;

    @ManyToOne(()=>ColorType, {nullable: true, onDelete: 'SET NULL'})
    @JoinColumn({name: 'color_type_id'})
    colorType?: null | ColorType;
}
