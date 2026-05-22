import type { FileCategory } from "../../enums/FileCategory";
import type { FileType } from "../../enums/FileType";

export interface MyFile {
    id: number,
    path: string, 
    name: string,
    is_approved?: boolean,
    type: FileType,
    category: FileCategory,
    // cat?: Cat,
    // colorType?: ColorType;
}
