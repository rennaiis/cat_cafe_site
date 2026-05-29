import { StatusType } from "../../../enums/StatusType"
import { calculateAge, catsListTest } from "../test/testCatsList"
import { filesListTest } from "../test/testFiles"
import type { Cat, MyFile } from "../types"
import s from '../styles/catApplication.module.css'
import { useState } from "react"

const filesList: MyFile[] = filesListTest
const catsList: Cat[] = catsListTest
const catsInCafe: Cat[]  = catsList.filter(cat => cat.status.type === StatusType.IN_CAFE)

function FillData(){
    const [selectedCat, setSelectedCat] = useState<Cat | null>(null)

    return (
        <>
        <main className="content-block">
            <h3>Выберите котика</h3>
            <div className={s.cats} >
            {catsInCafe.map((cat, idx)=>(
                <div     
                    className={ (selectedCat === cat) ? s.cardCat + ' scale '+ s.catCardChosen : s.cardCat + ' scale'} 
                    key={`${idx}-${cat.id}`}
                    onClick={() => setSelectedCat(cat)}
                    style={{ cursor: 'pointer' }}
                >
                    <img className={s.catImg}  src={`${cat.files[0].path}/${cat.files[0].name}`} alt="row2" />
                    <h5>{cat.name}</h5>
                </div>
            ))}
            </div>
            <h3>Заполните данные о себе</h3>
            <form className = {s.form} onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label htmlFor="adopter-name" className="little-text">Имя</label>
                    <input type="text" id='adopter-name' required/>
                </div>
                <div>
                    <label htmlFor="adopter-lastname" className="little-text">Фамилия</label>
                    <input type="text" id='adopter-lastname' required/>
                </div>
                <div>
                    <label htmlFor="adopter-lastname" className="little-text">Отчество</label>
                    <input type="text" id='adopter-middlename'/>
                </div>
                <div>
                    <label htmlFor="adopter-email" className="little-text">Электронная почта</label>
                    <input type="email" id='adopter-email' required/>
                </div>

                <div>
                    <label htmlFor="adopter-tel" className="little-text">Телефон (не обязательно)</label>
                    <input type="tel" id='adopter-tel' placeholder="+7(000)111-11-11"  pattern="+7([0-9]{3})[0-9]{3}-[0-9]{2}-[0-9]{2}"/>
                </div>
                <div>
                    <label htmlFor="adopter-contact" className="little-text">Другой контакт (не обязательно) </label>
                    <input type="text" id='adopter-contact'/>
                </div>              

                <button className={s.submitButton}>Далее</button>
            </form>
        </main>
        </>
    )
}
export default FillData