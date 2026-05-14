import { Column, Entity, PrimaryColumn } from "typeorm";
import { LandingItemType } from "../../../../enums/LandingItemType";

@Entity('landing_data')
export class LandingData{
    @PrimaryColumn({
        type: 'enum', 
        enum: LandingItemType
    })
    type: LandingItemType

    @Column({
        type: 'text'
    })
    text: string;
}