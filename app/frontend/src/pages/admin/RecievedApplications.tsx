import React, { Fragment, useEffect, useState, type ChangeEvent } from 'react';
import type { AdoptApplication, Adopter } from '../../types';
import styles from '../../styles/admin.module.css';
import { approveApplication, getAdoptApplications, rejectApplication, removeAdoptApplication } from '../../API/ApplicationsAPI';
import { getAdopters, removeAdopter, updateAdopter } from '../../API/AdoptersAPI';
import { NavLink } from 'react-router-dom'
import { ApplicationStatus } from '../../../../enums/ApplicationStatus';


const RecievedApplications: React.FC = () => {
    const [applications, setApplications] = useState<AdoptApplication[]>([])
    const [adopters, setAdopters] = useState<Adopter[]>([])
    const [editedAdopter, setEditedAdopter] = useState<Adopter | null>(null)

    const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
    async function loadData() {
        await getAdoptApplications().then((data)=>{
            setApplications(data)
            }).catch((err)=>console.error('loading applications mistake: ', err))
        await getAdopters().then((data)=>{
            setAdopters(data)
            }).catch((err)=>console.error('loading applications mistake: ', err))
    }
        
    useEffect(()=> {loadData()}, [])

    const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!editedAdopter) return;
        const { name, value } = e.target;
        setEditedAdopter({
            ...editedAdopter,
            [name]: value
        })
    }
    async function editAdopter(e: React.FormEvent) {
        e.preventDefault()
        if (!editedAdopter) return
        try{
            await updateAdopter({
                first_name: editedAdopter.first_name,
                last_name: editedAdopter.last_name,
                middle_name: editedAdopter.middle_name,
                mobile: editedAdopter.mobile,
                email: editedAdopter.email,
                contact: editedAdopter.contact
            }, editedAdopter.id)
            setEditedAdopter(null); 
            await loadData();           
            } catch (err) {
                console.error("edit error", err)
            }
    }
        
    const toggleAnswers = (id: number) => {
        setExpandedRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    
    return (
        <main className={styles.container }>
            <section>
                <h2>Список заявок</h2>
                <div className={styles.appsGrid + ' ' + styles.card} >
                    <div className={`${styles.gridTh} ${styles.hideOnMobile}`}>Статус</div>
                    <div className={`${styles.gridTh} ${styles.hideOnMobile}`}>Кот</div>
                    <div className={`${styles.gridTh} ${styles.hideOnMobile}`}>ФИО</div>
                    <div className={`${styles.gridTh} ${styles.hideOnMobile}`}>Контакты</div>
                    <div className={`${styles.gridTh} ${styles.hideOnMobile}`}>Действия</div>
                    {applications.map((app) => (
                        <Fragment key={app.id}>
                            <div className={`${styles.gridTd} ${
                                (app.application_status == ApplicationStatus.APPROVED) ? 
                                styles.approved : app.application_status == ApplicationStatus.NEW ?
                                styles.new : styles.rejected}`
                            }>{app.application_status}</div>
                            <div className={styles.gridTd} data-label="Кот">
                                <NavLink to={`/cats/${app.cat.id}`}>{app.cat.name}</NavLink>
                            </div>
                            <div className={styles.gridTd} data-label="ФИО">
                                {`${app.adopter.last_name} ${app.adopter.first_name} ${app.adopter.middle_name || ''}`.trim()}
                            </div>
                            <div className={styles.gridTd} data-label="Контакты">
                                <div>{app.adopter.contact || '-'}</div>
                                <div>{app.adopter.mobile || '-'}</div>
                                <div>{app.adopter.email}</div>
                            </div>
                            <div className={`${styles.gridTd} ${styles.actions}`} data-label="Действия">
                                <button type="button" onClick={async () => {
                                    await approveApplication(app.id)
                                    await loadData()
                                }}>Одобрить</button>
                                <button type="button" onClick={async () => {
                                    await rejectApplication(app.id)
                                    await loadData()
                                }}>Отклонить</button>
                                <button type="button" onClick={async () => {
                                    await removeAdoptApplication(app.id)
                                    await loadData()                               
                                    }}>Удалить</button>
                                <button type="button" onClick={() => toggleAnswers(app.id)}>
                                    {expandedRows[app.id] ? 'Скрыть ответы' : 'Показать ответы'}
                                </button>
                            </div>
                            
                            {expandedRows[app.id] && app.answers && (
                                <div className={styles.gridFullWidth}>
                                    <strong>Ответы на анкету:</strong>
                                    <ul>
                                        {app.answers.map((ans) => (
                                            <li key={ans.id}>
                                                <b>Вопрос {ans.question_id}:</b> {ans.answer}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </Fragment>
                    ))}
                </div>
            </section>
            <section>
                <h2>Хозяева котов</h2>
                <div className={styles.adoptersGrid + ' ' + styles.card}>
                    <div className={`${styles.gridTh} ${styles.hideOnMobile}`}>ФИО</div>
                    <div className={`${styles.gridTh} ${styles.hideOnMobile}`}>Контакты</div>
                    <div className={`${styles.gridTh} ${styles.hideOnMobile}`}>Коты</div>
                    <div className={`${styles.gridTh} ${styles.hideOnMobile}`}>Действия</div>

                    {adopters.map((adopter) => (
                        editedAdopter && editedAdopter.id === adopter.id ?
                        <Fragment key={adopter.id}>
                            <div className={`${styles.gridTd} ${styles.actions}`}  data-label="ФИО">
                               <input 
                                    type="text" 
                                    placeholder='имя'
                                    name='first_name'
                                    value={editedAdopter.first_name}
                                    onChange={handleEditChange}
                                    required                                   
                                />
                               <input 
                                    type="text" 
                                    placeholder='фамилия'
                                    name='last_name'
                                    value={editedAdopter.last_name}
                                    onChange={handleEditChange}
                                    required/>
                               <input 
                                    type="text" 
                                    placeholder='отчество'
                                    name='middle_name'
                                    value={editedAdopter.middle_name}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>
                             <div className={`${styles.gridTd} ${styles.actions}`} data-label="Контакты">
                                <input 
                                    type="text" 
                                    placeholder='доп. контакт'
                                    name='contact'
                                    value={editedAdopter.contact}
                                    onChange={handleEditChange}
                                />
                                <input 
                                    type="tel" 
                                    placeholder='телефон' 
                                    name='mobile'
                                    value={editedAdopter.mobile}
                                    onChange={handleEditChange}
                                />
                                <input 
                                    type="email" 
                                    placeholder='почта' 
                                    required
                                    name='email'
                                    value={editedAdopter.email}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div>
                            {adopter.cats && adopter.cats.length > 0 ? (
                                    <ul>
                                        {adopter.cats.map((cat) => (
                                            <li key={cat.id}>
                                                <NavLink to={`/cats/${cat.id}`}>{cat.name}</NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    'Пока нет '
                                )}
                            </div>
                            <div className={`${styles.gridTd} ${styles.actions}`}>
                                <div><button type="button" onClick={editAdopter}>Сохранить</button></div>
                                <div><button type="button" onClick={()=>setEditedAdopter(null)}>Отмена</button></div>
                            </div>   
                        </Fragment>:
                        <Fragment key={adopter.id}>
                            <div className={styles.gridTd }  data-label="ФИО">
                                {`${adopter.last_name} ${adopter.first_name} ${adopter.middle_name || ''}`.trim()}
                            </div>
                            <div className={styles.gridTd}  data-label="Контакты">
                                <div>{adopter.contact || '-'}</div>
                                <div>{adopter.mobile || '-'}</div>
                                <div>{adopter.email}</div>
                            </div>
                            <div className={styles.gridTd}  data-label="Коты">
                                {adopter.cats && adopter.cats.length > 0 ? (
                                    <ul>
                                        {adopter.cats.map((cat) => (
                                            <li key={cat.id}>
                                                <NavLink to={`/cats/${cat.id}`}>{cat.name}</NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    'Пока нет '
                                )}
                            </div>
                            <div className={`${styles.gridTd} ${styles.actions}`}>
                                <div><button type="button" onClick={
                                    ()=>{setEditedAdopter(adopter)}
                                }>Редактировать</button></div>
                                <div><button type="button" onClick={async()=>{
                                    await removeAdopter(adopter.id)
                                    await loadData()
                                }}>Удалить</button></div>
                            </div>        
                        </Fragment>
                    ))}
                </div>
            </section>
        </main>
    );
};
export default RecievedApplications;
