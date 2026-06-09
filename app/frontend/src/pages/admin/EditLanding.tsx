import React, { useEffect, useState, type ChangeEvent } from "react"
import { LandingItemType } from "../../../../enums/LandingItemType"
import type { LandingData, Rule } from "../../types"
import { rulesTest } from "../../test/testLandingData"
import s from '../../styles/adminLanding.module.css'
import { getLandingData, saveLandingData } from "../../API/LandingAPI"
import { createRule, getRules, removeRule, updateRule } from "../../API/RulesAPI"
const rulesList: Rule[] = rulesTest
const optionsList: string[] = ['При входе', 'В котокафе','Посещение с детьми','Аллергия']

function EditLanding() {
    const [landingData, setLandingData] =  useState<LandingData>()
    const [editedRuleId, setEditedRuleId] = useState<number|null>(null)
    const [rules, setRules] = useState<Rule[]>([])
    const [editedRule, setEditedRule] = useState<Rule | null>(null)
    const [ruleForm, setRuleForm] = useState<Omit<Rule, 'id'>>({
        category: optionsList[0], 
        text: ''
    })
    function loadData() {
        getLandingData().then((data)=>{
            setLandingData(data)
        }).catch((err)=>console.error('loading landing mistake: ', err))
        getRules().then((data)=>{
            setRules(data)
        }).catch((err)=>console.error('loading rules mistake: ', err))
    }

    useEffect(()=> {loadData()}, [])

    const handleChangeLanding = (key: LandingItemType, value: string | number) => {
        if (!landingData) return
        setLandingData({
            ...landingData,
            [key]: value
        })
    }
    const handleFormChange = (e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRuleForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleEditChange = (e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!editedRule) return;
        setEditedRule({
            ...editedRule,
            [name]: value
        })
    }

    
    async function addNewRule(e: React.FormEvent) {
        e.preventDefault()
        try{
            if (ruleForm.category !== '' && ruleForm.text !== ''){
            await createRule(ruleForm)
            }
            loadData()
            console.log(ruleForm)
            setRuleForm({
                category: optionsList[0], 
                text: ''
            })
        }catch(err){
            console.error("create error ", err)
        }
        
    }

    async function editRule(e: React.FormEvent) {
        e.preventDefault()
        if (!editedRule) return
        try{
            await updateRule({
                category: editedRule.category,
                text: editedRule.text
            }, editedRule.id)
            setEditedRule(null); 
            loadData();           
            } catch (err) {
                console.error("edit error", err);
        }
    }

    async function saveLanding (e: React.FormEvent){
        e.preventDefault()
        if (!landingData) return
        await saveLandingData(landingData) 
    } 
    
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
                            onChange={(e)=>handleChangeLanding(LandingItemType.CAFE_NAME, e.target.value)} 
                        />
                    </div>

                    <div>
                        <label>О нас:</label>
                        <textarea 
                            value={landingData[LandingItemType.ABOUT_US]} 
                            rows={10}
                            onChange={(e)=>handleChangeLanding(LandingItemType.ABOUT_US, e.target.value)}/>
                    </div>

                    <div>
                        <label>Адрес:</label>
                        <input 
                            type="text"
                            value={landingData[LandingItemType.ADRESS]}
                            onChange={(e)=>handleChangeLanding(LandingItemType.ADRESS, e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Телефон:</label>
                        <input 
                            type="tel"
                            value={landingData[LandingItemType.CONTACT_PHONE]}
                            onChange={(e)=>handleChangeLanding(LandingItemType.CONTACT_PHONE, e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            value={landingData[LandingItemType.CONTACT_EMAIL]}  
                            onChange={(e)=>handleChangeLanding(LandingItemType.CONTACT_EMAIL, e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Ссылка на VK:</label>
                        <input 
                            type="url" 
                            value={landingData[LandingItemType.VK_LINK]} 
                            onChange={(e)=>handleChangeLanding(LandingItemType.VK_LINK, e.target.value)} />
                    </div>

                    <div>
                        <label>Ссылка на карту (iframe):</label>
                        <input 
                            type="text" 
                            value={landingData[LandingItemType.MAP_LINK]} 
                            onChange={(e)=>handleChangeLanding(LandingItemType.MAP_LINK, e.target.value)} 
                        />
                    </div>

                    <fieldset>
                        <legend>Статистика котиков</legend>
                        <div>
                            <label>Котиков в кафе:</label>
                            <input 
                                type="number" 
                                value={Number(landingData[LandingItemType.CATS_IN_CAFE])}  
                                onChange={(e)=>handleChangeLanding(LandingItemType.CATS_IN_CAFE, e.target.value)}/>
                        </div>
                        <div>
                            <label>Котиков нашли дом:</label>
                            <input 
                                type="number" 
                                value={Number(landingData[LandingItemType.CATS_AT_HOME])}  
                                onChange={(e)=>handleChangeLanding(LandingItemType.CATS_AT_HOME, e.target.value)}/>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Цены и скидки</legend>
                        <div>
                            <label>Цена за первый час:</label>
                            <input
                                type="number" 
                                value={Number(landingData[LandingItemType.FIRST_HOUR_PRICE_STANDART])} 
                                onChange={(e)=>handleChangeLanding(LandingItemType.FIRST_HOUR_PRICE_STANDART, e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Цена за последующие часы:</label>
                            <input 
                                type="number" 
                                value={Number(landingData[LandingItemType.FOLLOWING_HOURS_PRICE_STANDART])}  
                                onChange={(e)=>handleChangeLanding(LandingItemType.FOLLOWING_HOURS_PRICE_STANDART, e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Студенческий тариф (цена):</label>
                            <input
                                type="number" 
                                value={Number(landingData[LandingItemType.STUDENTS_PRICE])}  
                                onChange={(e)=>handleChangeLanding(LandingItemType.STUDENTS_PRICE, e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Условия для студентов:</label>
                            <textarea 
                                value={landingData[LandingItemType.STUDENTS_CONDITIONS]}
                                rows={2} 
                                onChange={(e)=>handleChangeLanding(LandingItemType.STUDENTS_CONDITIONS, e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Размер групповой скидки (%):</label>
                            <input 
                                type="number" 
                                value={Number(landingData[LandingItemType.GROUP_DISCOUNT])} 
                                onChange={(e)=>handleChangeLanding(LandingItemType.GROUP_DISCOUNT, e.target.value)} 
                            />
                        </div>
                        <div>
                            <label>Количество человек для скидки:</label>
                            <input 
                                type="number" 
                                value={Number(landingData[LandingItemType.GROUP_PEOPLE_AMOUNT])}  
                                onChange={(e)=>handleChangeLanding(LandingItemType.GROUP_PEOPLE_AMOUNT, e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Условия групповой скидки:</label>
                            <input 
                                type="text" 
                                value={landingData[LandingItemType.GROUP_CONDITIONS]} 
                                onChange={(e)=>handleChangeLanding(LandingItemType.GROUP_CONDITIONS, e.target.value)} 
                            />
                        </div>
                    </fieldset>

                    <button type="submit">Сохранить изменения</button>
                </form>
            </section>

            <section>
                <h2>Управление правилами</h2>

                <form onSubmit={addNewRule}>
                    <h3>Добавить новое правило</h3>
                    <div>
                        <label>Категория:</label>
                        <select
                            name='category'
                            value={ruleForm.category}
                            onChange={handleFormChange}>
                            {optionsList.map((option)=>(
                                <option key={option} value={option}>{option}</option>                            
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Текст правила:</label>
                        <textarea 
                            name="text"
                            value={ruleForm.text} 
                            onChange={handleFormChange} 
                            rows={3} 
                            placeholder="Введите текст правила..." 
                        />
                    </div>
                    <button type='submit'>Добавить правило</button>
                </form>

                <h3>Список текущих правил</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Категория</th>
                            <th>Текст правила</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rules.map((rule) => (
                            <tr key={rule.id}>
                                {editedRule && editedRule.id === rule.id ? 
                                <>
                                    <td>
                                    <select 
                                        name="category"
                                        value={editedRule.category}
                                        onChange={handleEditChange}
                                        >
                                        {optionsList.map((option)=>(
                                            <option value={option}>{option}</option>                            
                                        ))}
                                    </select>
                                    </td>
                                    <td>
                                        <textarea
                                        name="text"
                                        value={editedRule.text} 
                                        rows={2}
                                        onChange={handleEditChange} />
                                    </td>
                                    <td className={s.row}>
                                        <button onClick={()=>{setEditedRule(null) 
                                        }
                                        }>Отмена</button>
                                        <button onClick={editRule}>Сохранить</button>
                                    </td>
                                </> : 
                                <>
                                    <td>{rule.category}</td>
                                    <td>{rule.text}</td>
                                    <td className={s.row}>
                                        <button onClick={()=>setEditedRule({...rule})}>Редактировать</button>
                                        <button 
                                            type="button" 
                                            onClick={async ()=>{
                                                await removeRule(rule.id); 
                                                loadData()
                                            }}>Удалить
                                        </button>
                                    </td>
                                </>
                                }
                            </tr> 
                        
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default EditLanding
