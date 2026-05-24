import { string } from "zod";
import type { FileCategory } from "../../enums/FileCategory";
import type { FileType } from "../../enums/FileType";
import type { LandingItemType } from "../../enums/LandingItemType";
import type { CatGender } from "../../enums/CatGender";
import type { StatusType } from "../../enums/StatusType";

export interface MyFile {
    id: number,
    path: string, 
    name: string,
    is_approved?: boolean,
    type: FileType,
    category: FileCategory,
    cat?: Cat,
    // colorType?: ColorType;
}

export interface LandingData {
    [LandingItemType.ABOUT_US]: string, 
    [LandingItemType.CAFE_NAME]: string, 
    [LandingItemType.CATS_AT_HOME]: number, 
    [LandingItemType.CATS_IN_CAFE]: number,
    [LandingItemType.GROUP_DISCOUNT]:number, 
    [LandingItemType.GROUP_PEOPLE_AMOUNT]:number, 
    [LandingItemType.FIRST_HOUR_PRICE_STANDART]: number, 
    [LandingItemType.FOLLOWING_HOURS_PRICE_STANDART]: number, 
    [LandingItemType.STUDENTS_PRICE]: number,
    [LandingItemType.STUDENTS_CONDITIONS]: string,
    [LandingItemType.GROUP_CONDITIONS]:string,
    [LandingItemType.ADRESS]: string, 
    [LandingItemType.MAP_LINK]: string, 
    [LandingItemType.VK_LINK]: string, 
    [LandingItemType.CONTACT_EMAIL]: string, 
    [LandingItemType.CONTACT_PHONE]: string
}

export interface Rule {
    id: number
    text: string;
    category: string;   
}

export interface Cat {
    id: number
    name: string
    gender: CatGender
    description?: string
    breed?: string
    birth_date?: Date
    accept_date?: Date
    adopt_date?: Date
    color_type: ColorType
    status: Status
    //adopter?: Adopter
    files: MyFile[]
    //adopt_applications: AdoptApplication[]
}

export interface ColorType {
  id: number;
  color_type: string;
  color: string;
  cats?: Cat[];
  file: MyFile;
  file_id: number;
}

export interface Status {
  id: number;
  status: string;
  color?: string;
  type: StatusType; 
}
