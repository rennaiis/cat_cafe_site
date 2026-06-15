import { StatusType } from "../../../enums/StatusType"
import { catsListTest } from "../test/testCatsList"
import { filesListTest } from "../test/testFiles"
import type { Adopter, Cat, MyFile } from "../types"
import s from '../styles/catApplication.module.css'
import { useEffect, useState } from "react"
import { getCats } from "../API/CatsAPI"
import { filesStorageURL } from "../API/filesAPI"

interface FillDataProps {
    onNext: (catId: number, adopterData: Omit<Adopter, 'id'>)=>void
}

function FillData({onNext}:FillDataProps){
    function loadData() {
        getCats().then((data: Cat[])=>{
            const catsInCafe  = data.filter(cat => cat.status?.type === StatusType.IN_CAFE)
            setCats(catsInCafe)
            }).catch((err)=>console.error('loading cats mistake: ', err))
        }
    useEffect(()=>{loadData()}, [])
    const [cats, setCats] = useState<Cat[]>([])
    const [selectedCat, setSelectedCat] = useState<Cat | null>(null)
    const [formData, setFormData] = useState<Omit<Adopter, 'id'>>({
        first_name: '', 
        last_name: '',
        middle_name: '', 
        email: '', 
        mobile: '', 
        contact: ''
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prev=>({
            ...prev, 
            [name]: value
        }))
    }
    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault()
        if (!selectedCat){
            alert('Пожалуйста, выберите котика')
            return
        }
        onNext(selectedCat.id, formData)
    }
    return (
        <>
        <main className="content-block">
            <h3>Выберите котика</h3>
            <div className={s.cats} >
            {cats.map((cat, idx)=>(
                <div     
                    className={ (selectedCat === cat) ? s.cardCat + ' '+ s.catCardChosen : s.cardCat} 
                    key={`${idx}-${cat.id}`}
                    onClick={() => setSelectedCat(cat)}
                    style={{ cursor: 'pointer' }}
                >
                    <img className={s.catImg}  src={`${filesStorageURL}/${cat.files[0].path}`} alt="row2" />
                    <h5>{cat.name}</h5>
                </div>
            ))}
            </div>
            <h3>Заполните данные о себе</h3>
            <form className = {s.form} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="first_name" className="little-text">Имя</label>
                    <input 
                        value={formData.first_name}
                        type="text" 
                        id='first_name' 
                        name="first_name"
                        onChange={handleInputChange} 
                    required/>
                </div>
                <div>
                    <label htmlFor="last_name" className="little-text">Фамилия</label>
                    <input 
                        value={formData.last_name}
                        type="text" 
                        id='last_name' 
                        name='last_name' 
                        onChange={handleInputChange}
                    required/>
                </div>
                <div>
                    <label htmlFor="middle_name" className="little-text">Отчество</label>
                    <input 
                        value={formData.middle_name}
                        type="text" 
                        id='middle_name'
                        name="middle_name"
                        onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="email" className="little-text">Электронная почта</label>
                    <input 
                        value={formData.email}
                        type="email"
                        id='email' 
                        name='email'
                        onChange={handleInputChange} 
                    required/>
                </div>

                <div>
                    <label htmlFor="mobile" className="little-text">Телефон (не обязательно)</label>
                    <input
                        value={formData.mobile} 
                        type="tel" 
                        id='mobile' 
                        name='mobile'
                        placeholder="+7(000)111-11-11" 
                        pattern="+7([0-9]{3})[0-9]{3}-[0-9]{2}-[0-9]{2}"
                        onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="contact" className="little-text">Другой контакт (ВК, телеграм. не обязательно) </label>
                    <input 
                        value={formData.contact}
                        type="text" 
                        id='contact'
                        name="contact"
                        onChange={handleInputChange} 
                    />
                </div>              

                <button className={s.submitButton} type="submit">Далее</button>
            </form>
        </main>
        </>
    )
}
export default FillData