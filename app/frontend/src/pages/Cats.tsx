import { useEffect, useState } from "react" 
import { FileCategory } from "../../../enums/FileCategory"
import { calculateAge, catsListTest } from "../test/testCatsList"
import { filesListTest } from "../test/testFiles"
import type { Cat, MyFile } from "../types"
import s from '../styles/cats.module.css'
import { StatusType } from "../../../enums/StatusType"
import  CatPage from "./CatPage"
import { getCats } from "../API/CatsAPI"
import { filesStorageURL } from "../API/filesAPI"

const filesList: MyFile[] = filesListTest
const colorTypesList: MyFile[] = filesList.filter(f => f.category == FileCategory.COLOR_TYPE_ICON)
const catsList: Cat[] = catsListTest

function Cats(){
    const [cats, setCats] = useState<Cat[]>([])
    function loadData() {
        getCats().then((data)=>{
            setCats(data)
        }).catch((err)=>console.error('loading cats mistake: ', err))
        }
    useEffect(()=> {loadData()}, [])
    
    const [selectedCat, setSelectedCat] = useState<Cat | null>(null)
    if (selectedCat) {
        return (
            <div>
                <button 
                    onClick={() => setSelectedCat(null)} 
                >← Назад к списку </button>
                <CatPage cat={selectedCat}/>
            </div>
        )
    }
    return (
        <>
        <h4 className={s.header + ' scale'}>Наши котики</h4>
        <div className={s.cats} >
            {cats.filter(cat => cat.status?.type === StatusType.IN_CAFE).map((cat, idx)=>(
                <div 
                    className={s.cardCat + ' scale'} 
                    key={`${idx}-${cat.id}`}
                    onClick={() => setSelectedCat(cat)}>   
                    {(cat.files.length > 0) ? 
                    <img className={s.catImg}  src={`${filesStorageURL}/${cat.files[0].path}`} alt="row2" /> : <></>}
                    
                    <h3>{cat.name}, {cat.gender}, {cat.birth_date ? calculateAge(cat.birth_date) : ''}</h3>
                    <p className={s.cardDescription}>{cat.description}</p>
                </div>
            ))}
        </div>
        
        <h4 className={s.header + ' scale'}>Уже нашли дом</h4>
        <div className={s.cats} >
            { cats.filter(cat => cat.status?.type === StatusType.ADOPTED).map((cat, idx)=>(
                <div  
                    className={s.cardCat + ' scale'} 
                    key={`${idx}-${cat.id}`}
                    onClick={() => setSelectedCat(cat)}
                    style={{ cursor: 'pointer' }}
                >
                    <img className={s.catImg}  src={`${cat.files[0].path}/${cat.files[0].name}`} alt="row2" />
                    <h3>{cat.name}</h3>
                </div>
            ))}
        </div>
        </>
    )
}

export default Cats 
