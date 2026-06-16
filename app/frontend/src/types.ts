import { string } from "zod";
import type { FileCategory } from "../../enums/FileCategory";
import type { FileType } from "../../enums/FileType";
import type { LandingItemType } from "../../enums/LandingItemType";
import type { CatGender } from "../../enums/CatGender";
import type { StatusType } from "../../enums/StatusType";
import type { ApplicationStatus } from "../../enums/ApplicationStatus";
import type { UserRole } from "../../enums/UserRole";

export interface MyFile {
    id: number,
    path: string, 
    name: string,
    is_approved?: boolean,
    type: FileType,
    category: FileCategory,
    cat?: Cat,
    colorType?: ColorType;
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
    [LandingItemType.CLOSE_TIME]: number, 
    [LandingItemType.OPEN_TIME]: number, 
    [LandingItemType.STUDENTS_PRICE]: number,
    [LandingItemType.LOGO_LINK]: string,
    [LandingItemType.STUDENTS_CONDITIONS]: string,
    [LandingItemType.GROUP_CONDITIONS]:string,
    [LandingItemType.ADRESS]: string, 
    [LandingItemType.MAP_LINK]: string, 
    [LandingItemType.VK_LINK]: string, 
    [LandingItemType.CONTACT_EMAIL]: string, 
    [LandingItemType.CONTACT_PHONE]: string
}

export interface objectWithId {
  id: number
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
    color_type?: ColorType
    status: Status | undefined
    adopter?: Adopter
    files: MyFile[]
    adopt_applications?: AdoptApplication[]
}

export interface ColorType {
  id: number;
  color_type: string;
  color?: string;
  cats?: Cat[];
  file: MyFile;
}

export interface Status {
  id: number;
  status: string;
  color?: string;
  type: StatusType; 
}

export interface Question {
  id: number;
  question_text: string;
  is_mandatory: boolean;
  is_open: boolean;
  one_answer?: boolean;
  variants?: string[];
}

export interface Answer {
  id: number;
  answer: string;
  question_id: number;
  application_id: number;
}

export interface AnswerDTO {
  answer: string;
  question_id: number;
  application_id: number;
}

export interface AdoptApplicationDto{
  adopter_id: number;
  cat_id: number;
  application_status: ApplicationStatus;
}
export interface AdoptApplication {
    id: number
    adopter: Adopter
    answers?: Answer[]
    cat: Cat
    application_status: ApplicationStatus
}

export interface Adopter {
    id: number
    first_name: string
    last_name: string
    middle_name?: string
    mobile?: string
    email: string
    contact?: string
    cats?: Cat[]
    adopt_applications?: AdoptApplication[]
}


export interface AdopterDTO {
    id: number
    first_name: string
    last_name: string
    middle_name?: string
    mobile?: string
    email: string
    contact?: string
}


export interface FileDto {
    type: FileType
    category: FileCategory
    cat_id?: number
    color_type_id?: number
    is_approved: boolean
}

export interface CatDto {
    status_id: number;
    color_type_id?: number;
    adopter_id?: number;
    name: string;
    gender: CatGender;
    description?: string;
    breed?: string;
    birth_date?: string;
    accept_date?: string;
    adopt_date?: string;
}

export interface User {
    id: number
    login: string
    password_hash: string;
    role: UserRole
}
