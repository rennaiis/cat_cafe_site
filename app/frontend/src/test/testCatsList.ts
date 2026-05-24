import { CatGender } from "../../../enums/CatGender";
import { StatusType } from "../../../enums/StatusType";
import type { ColorType, MyFile, Status } from "../types";
import { filesListTest } from "./testFiles";
const getYearsAgo = (years: number): Date => {
    const date = new Date();
    date.setFullYear(Number(date.getFullYear) - years)
    return date
}
const filesList: MyFile[] = filesListTest
export const statusListTest: Status[] = [
    {
        id: 1, 
        status: 'в котокафе', 
        type: StatusType.IN_CAFE
    }, 
    {
        id: 2, 
        status: 'на адаптации', 
        type: StatusType.HIDDEN
    }, 
    {
        id: 3, 
        status: 'дома', 
        type: StatusType.ADOPTED
    }
]
export const colorTypesTest: ColorType[] = [{
    id: 1, 
    color_type: 'Серо-белая', 
    file: filesList[14]
}]

export const catsListTest = [
    {
        id: 1, 
        name: 'Софа', 
        gender: CatGender.FEMALE, 
        description: `Приехала к нам из Переславля, все ее родственники были 
        пристроены в семьи, а Софа как-то задержалась на передержке.
         С взрослением превратилась в шикарную, важную, самодостаточную боярыню.
        Своенравная, но ласковая. Любит и на ручках полежать, если хорошо знакома с человеком. 
        Пушистая девочка Софа, этой красотке около 6 лет, самое настоящее украшение человеческих рук ❤`, 
        birth_date: getYearsAgo(6), 
        status: statusListTest[0], 
        files: [filesListTest[14]], 
        color_type: colorTypesTest[0]
    }, 
]



