import React, { useEffect, useState } from "react"
import { LandingItemType } from "../../../../enums/LandingItemType"
import type { LandingData, Rule } from "../../types"
import { landingDataTest, rulesTest } from "../../test/testLandingData"
import s from '../../styles/adminLanding.module.css'
import { getLandingData, saveLandingData } from "../../API/LandingAPI"
const rulesList: Rule[] = rulesTest

function EditLanding() {
    const [landingData, setLandingData] =  useState<LandingData>()
    useEffect(()=>{
        getLandingData().then((data)=>{
            setLandingData(data)
        }).catch((err)=>console.error('loading landing mistake: ', err))
    }, [])
    const handleChange = (key: LandingItemType, value: string | number) => {
        if (!landingData) return
        setLandingData({
            ...landingData,
            [key]: value
        })
    }
    async function saveLanding (e: React.FormEvent){
        e.preventDefault()
        if (!landingData) return
        await saveLandingData(landingData) 
    } 
    const [rules, setRules] = useState<Rule[]>(rulesList)
    const [ruleForm, setRuleForm] = useState({ text: "", category: "При входе" })
    if (!landingData) {
        return <div>Загрузка...</div>; 
    }
    return (
        <main className={s.container}>
            <section>
                <h2>Основная информация</h2>
                <form onSubmit={saveLanding}>
                    <div>
                        <label>Название кафе:</label>
                        <input 
                            type="text" 
                            value={landingData[LandingItemType.CAFE_NAME]} 
                            onChange={(e)=>handleChange(LandingItemType.CAFE_NAME, e.target.value)} 
                        />
                    </div>

                    <div>
                        <label>О нас:</label>
                        <textarea 
                            value={landingData[LandingItemType.ABOUT_US]} 
                            rows={10}
                            onChange={(e)=>handleChange(LandingItemType.ABOUT_US, e.target.value)}/>
                    </div>

                    <div>
                        <label>Адрес:</label>
                        <input 
                            type="text"
                            value={landingData[LandingItemType.ADRESS]}
                            onChange={(e)=>handleChange(LandingItemType.ADRESS, e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Телефон:</label>
                        <input 
                            type="tel"
                            value={landingData[LandingItemType.CONTACT_PHONE]}
                            onChange={(e)=>handleChange(LandingItemType.CONTACT_PHONE, e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            value={landingData[LandingItemType.CONTACT_EMAIL]}  
                            onChange={(e)=>handleChange(LandingItemType.CONTACT_EMAIL, e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Ссылка на VK:</label>
                        <input 
                            type="url" 
                            value={landingData[LandingItemType.VK_LINK]} 
                            onChange={(e)=>handleChange(LandingItemType.VK_LINK, e.target.value)} />
                    </div>

                    <div>
                        <label>Ссылка на карту (iframe):</label>
                        <input 
                            type="text" 
                            value={landingData[LandingItemType.MAP_LINK]} 
                            onChange={(e)=>handleChange(LandingItemType.MAP_LINK, e.target.value)} 
                        />
                    </div>

                    <fieldset>
                        <legend>Статистика котиков</legend>
                        <div>
                            <label>Котиков в кафе:</label>
                            <input 
                                type="number" 
                                value={Number(landingData[LandingItemType.CATS_IN_CAFE])}  
                                onChange={(e)=>handleChange(LandingItemType.CATS_IN_CAFE, e.target.value)}/>
                        </div>
                        <div>
                            <label>Котиков нашли дом:</label>
                            <input 
                                type="number" 
                                value={Number(landingData[LandingItemType.CATS_AT_HOME])}  
                                onChange={(e)=>handleChange(LandingItemType.CATS_AT_HOME, e.target.value)}/>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Цены и скидки</legend>
                        <div>
                            <label>Цена за первый час:</label>
                            <input
                                type="number" 
                                value={Number(landingData[LandingItemType.FIRST_HOUR_PRICE_STANDART])} 
                                onChange={(e)=>handleChange(LandingItemType.FIRST_HOUR_PRICE_STANDART, e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Цена за последующие часы:</label>
                            <input 
                                type="number" 
                                value={Number(landingData[LandingItemType.FOLLOWING_HOURS_PRICE_STANDART])}  
                                onChange={(e)=>handleChange(LandingItemType.FOLLOWING_HOURS_PRICE_STANDART, e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Студенческий тариф (цена):</label>
                            <input
                                type="number" 
                                value={Number(landingData[LandingItemType.STUDENTS_PRICE])}  
                                onChange={(e)=>handleChange(LandingItemType.STUDENTS_PRICE, e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Условия для студентов:</label>
                            <textarea 
                                value={landingData[LandingItemType.STUDENTS_CONDITIONS]}
                                rows={2} 
                                onChange={(e)=>handleChange(LandingItemType.STUDENTS_CONDITIONS, e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Размер групповой скидки (%):</label>
                            <input 
                                type="number" 
                                value={Number(landingData[LandingItemType.GROUP_DISCOUNT])} 
                                onChange={(e)=>handleChange(LandingItemType.GROUP_DISCOUNT, e.target.value)} 
                            />
                        </div>
                        <div>
                            <label>Количество человек для скидки:</label>
                            <input 
                                type="number" 
                                value={Number(landingData[LandingItemType.GROUP_PEOPLE_AMOUNT])}  
                                onChange={(e)=>handleChange(LandingItemType.GROUP_PEOPLE_AMOUNT, e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Условия групповой скидки:</label>
                            <input 
                                type="text" 
                                value={landingData[LandingItemType.GROUP_CONDITIONS]} 
                                onChange={(e)=>handleChange(LandingItemType.GROUP_CONDITIONS, e.target.value)} 
                            />
                        </div>
                    </fieldset>

                    <button type="submit">Сохранить изменения</button>
                </form>
            </section>

            <section>
                <h2>Управление правилами</h2>

                <form onSubmit={(e) => e.preventDefault()}>
                    <h3>Добавить новое правило</h3>
                    <div>
                        <label>Категория:</label>
                        <select value={ruleForm.category}>
                            <option value="При входе">При входе</option>
                            <option value="В котокафе">В котокафе</option>
                            <option value="Посещение с детьми">Посещение с детьми</option>
                            <option value="Аллергия">Аллергия</option>
                        </select>
                    </div>
                    <div>
                        <label>Текст правила:</label>
                        <textarea value={ruleForm.text} readOnly rows={3} placeholder="Введите текст правила..." />
                    </div>
                    <button type="button">Добавить правило</button>
                </form>

                <h3>Список текущих правил</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Категория</th>
                            <th>Текст правила</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rules.map((rule) => (
                            <tr key={rule.id}>
                                <td>{rule.id}</td>
                                <td>
                                    <input type="text" value={rule.category} readOnly />
                                </td>
                                <td>
                                    <textarea value={rule.text} readOnly rows={2} />
                                </td>
                                <td className={s.row}>
                                    <button type="button">Сохранить строку</button>
                                    <button type="button">Удалить</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default EditLanding
