import { useEffect, useState } from "react" 
import type { Cat } from "../types"
import s from '../styles/cats.module.css'
import { StatusType } from "../../../enums/StatusType"
import { calculateAge, getCats } from "../API/CatsAPI"
import { filesStorageURL } from "../API/filesAPI"
import { useNavigate } from "react-router-dom"

function Cats(){
    const [cats, setCats] = useState<Cat[]>([])
    const navigate = useNavigate()
    async function loadData() {
        await getCats().then((data)=>{
            setCats(data)
        }).catch((err)=>console.error('loading cats mistake: ', err))
        }
    useEffect(()=> {loadData()}, [])
    
    return (
        <main>
        <h4 className={s.header + ' scale'}>Наши котики</h4>
        <div className={s.cats} >
            {cats.filter(cat => cat.status?.type === StatusType.IN_CAFE).map((cat, idx)=>(
                <div 
                    className={s.cardCat + ' scale'} 
                    key={`${idx}-${cat.id}`}
                    onClick={() => navigate(`/cats/${cat.id}`)}>   
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
                    onClick={() => navigate(`/cats/${cat.id}`)}
                    style={{ cursor: 'pointer' }}
                >
                    <img className={s.catImg} src={`${filesStorageURL}/${cat.files[0].path}`} alt="row2" />
                    <h3>{cat.name}</h3>
                </div>
            ))}
        </div>
        </main>
    )
}

export default Cats 
