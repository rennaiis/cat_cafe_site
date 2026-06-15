import { NavLink, useNavigate } from 'react-router-dom'
import s from '../../styles/admin.module.css'
import catStyle from '../../styles/catPage.module.css' 
import { useEffect, useState, type ChangeEvent } from "react"
import type { Adopter, Cat, objectWithId, Status } from "../../types"
import { StatusType } from "../../../../enums/StatusType"
import { createStatus, getStatuses, removeStatus, updateStatus } from "../../API/StatusesAPI"
import { getCats, removeCat, updateCat } from '../../API/CatsAPI'

import { filesStorageURL } from '../../API/filesAPI'
import { getAdopters } from '../../API/AdoptersAPI'
function EditCats(){
    const navigate = useNavigate()        
    const [statusForm, setStatusForm] = useState<Omit<Status, 'id'>>({
        status: '', 
        color: '#FFFFFF', 
        type: StatusType.IN_CAFE
    })
    const [editedStatus, setEditedStatus] = useState<Status | null>(null)
    const [editedCat, setEditedCat] = useState<Cat | null>(null)
    const [statuses, setStatuses] = useState<Status[]>([])
    const [cats, setCats] = useState<Cat[]>([])
    const [adopters, setAdopters] = useState<Adopter[]>([])
    function loadData() {
        getStatuses().then((data)=>{
            setStatuses(data)
        }).catch((err)=>console.error('loading statuses mistake: ', err))
        getCats().then((data)=>{
            setCats(data)
        }).catch((err)=>console.error('loading cats mistake: ', err))
        getAdopters().then((data)=>{
            setAdopters(data)
        }).catch((err)=>console.error('loading adopters mistake: ', err))
    }
    useEffect(()=> {loadData()}, [])
    const statusTypes = Object.values(StatusType)
    const handleFormChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setStatusForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleEditChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        if (!editedStatus) return;
            setEditedStatus({
            ...editedStatus,
            [name]: value
        })
    }
    const handleRelationChange = <T extends objectWithId>( fieldName: keyof Omit<Cat, 'id'>, dataSource: T[]) => {
        if (!editedCat){
            return
        }else{
            return (e: ChangeEvent<HTMLSelectElement>) => {
                const selectedId = Number(e.target.value)
                const foundObject = dataSource.find(item => item.id === selectedId)
                if (foundObject ){
                    setEditedCat({
                    ...editedCat, 
                    [fieldName]: foundObject
                    })
                }
            }
        }
    }
    async function addNewStatus(e: React.FormEvent) {
        e.preventDefault()
        try{
            if (statusForm.status !== ''){
                await createStatus(statusForm)
            }
            loadData()
            setStatusForm({
                status: '', 
                color: '#FFFFFF', 
                type: StatusType.IN_CAFE
            })
        }catch(err){
            console.error("create error ", err)
        }
    }

    async function editStatus(e: React.FormEvent) {
        e.preventDefault()
        if (!editedStatus) return
        try{
            const {id, ...result} = editedStatus
            await updateStatus(result, editedStatus.id)
            setEditedStatus(null); 
            loadData();           
            } catch (err) {
                console.error("edit error", err);
            }
        }

    async function editCat(e: React.FormEvent) {
        e.preventDefault()
        if (!editedCat) return
        try{
            const {id, ...result} = editedCat
            await updateCat({
                status_id: result.status?.id ?? 0,
                name: result.name,
                gender: result.gender,
                adopter_id: result.adopter?.id
            }, editedCat.id)
            setEditedCat(null); 
            loadData();           
            } catch (err) {
                console.error("edit error", err);
            }
        }
    
    return (
        <main className={s.container}>
        <h2>Коты</h2>
        {cats.map((cat)=>(
            <div key={cat.id} className={s.itemCard} >
                <div>
                    <h3 className={catStyle.noMargin}>{cat.name}</h3>
                    {cat.files.length > 0? 
                    <img className={catStyle.mainCardImg} src={`${filesStorageURL}/${cat.files[0].path}`} /> : <></>}
                </div>
                {editedCat && editedCat.id === cat.id ? 
                <>
                <div>               
                    <div className={s.field}>
                            <label className={s.label}>Статус</label>
                            <select
                            name='status'
                            value={editedCat.status?.id || ''}
                            onChange={handleRelationChange('status', statuses)}
                            required>
                            {statuses.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.status}
                                </option>                            
                            ))}
                        </select>
                    </div>
                    <div className={s.field}>
                        {(cat.status?.type == StatusType.ADOPTED || editedCat.status?.type == StatusType.ADOPTED) ? <>
                            <label className={s.label}>Хозяин</label>      
                            <select onChange={handleRelationChange('adopter', adopters)} name='adopter' value={editedCat.adopter?.id || ''}required>
                            {adopters.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.first_name + ' ' + option.last_name}
                            </option>  ))}
                        </select>
                        </> : <></>}
                    </div>
                </div>
                <div className={s.actions}>
                    <button onClick={editCat}>Сохранить</button>
                    <button onClick={()=>{setEditedCat(null)}}>Отмена</button>
                </div>
                </>
                :   
                <>
                <div>               
                    <div className={s.field}>
                        <div className={s.label}>Статус</div>
                        <div>{cat.status?.status}</div>                        
                    </div>
                    <div className={s.field}>
                        {cat.status?.type === StatusType.ADOPTED && cat.adopter ? <>
                            <div className={s.label}>Хозяин</div>
                            <div>{cat.adopter?.first_name + ' ' + cat.adopter?.last_name}</div>
                            <div>Почта: {cat.adopter?.email}</div>
                            {cat.adopter?.mobile ? <div>Телефон: {cat.adopter.mobile}</div> : <></>}
                        </> : <></>}
                        </div>
                </div>
                <div className={s.actions}>
                    <button onClick={()=>{
                        removeCat(cat.id)
                        loadData()
                    }
                    }>Удалить</button>
                    <button onClick={()=>{setEditedCat(cat)}}>Редактировать</button>
                    <button onClick={()=>navigate(`${cat.id}`)}>Подробнее</button>
                </div>
                </>}  
            </div>
        ))}
        <button><NavLink to='../newCat'>Добавить кота</NavLink></button>
        <h2>Статусы</h2>
            <form className={s.itemCardVertical} onSubmit={addNewStatus}>
                <h3>Добавить новый статус</h3>
                <div>
                    <label >Тип статуса:</label>
                    <select
                        name='type'
                        value={statusForm.type}
                        onChange={handleFormChange}>
                        {statusTypes.map((option)=>(
                            <option key={option} value={option}>{option}</option>                            
                        ))}
                    </select>
                </div>
                <div>
                    <label>Статус:</label>
                    <input 
                        name="status"
                        value={statusForm.status} 
                        onChange={handleFormChange} 
                        required
                    />
                </div>
                <div>
                    <label>Цвет:</label>
                    <input 
                        name="color"
                        type='color'
                        value={statusForm.color} 
                        onChange={handleFormChange} 
                    />
                </div>
                <button type='submit'>Добавить статус</button>
            </form>
                <div className={s.list}>
                    {statuses.map((status) => (
                        <div key={status.id} className={s.itemCard}>
                            {editedStatus && editedStatus.id === status.id ? (
                                <>
                                    <div className={s.field}>
                                        <label>Тип</label>
                                        <select
                                            name="type"
                                            value={editedStatus.type}
                                            onChange={handleEditChange}
                                        >
                                            {statusTypes.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className={s.field}>
                                        <label>Статус</label>
                                        <input 
                                            type="text"
                                            name="status"
                                            value={editedStatus.status}
                                            onChange={handleEditChange}
                                        />
                                    </div>

                                    <div>
                                        <label>Цвет:</label>
                                        <input 
                                            name="color"
                                            type='color'
                                            value={editedStatus.color} 
                                            onChange={handleEditChange} 
                                        />
                                    </div>

                                    <div className={s.actions}>
                                        <button
                                            onClick={() => {
                                                setEditedStatus(null);
                                            }}>
                                            Отмена
                                        </button>

                                        <button onClick={editStatus}>
                                            Сохранить
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={s.field}>
                                        <span className={s.label}>Тип</span>
                                        <span>{status.type}</span>
                                    </div>

                                    <div className={s.field}>
                                        <span className={s.label}>Статус</span>
                                        <span>{status.status}</span>
                                    </div>

                                    <div className={s.field} style={{backgroundColor: status.color}}>
                                        <span className={s.label}>Цвет</span>
                                        <span>{status?.color}</span>
                                    </div>

                                    <div className={s.actions}>
                                        <button onClick={() => setEditedStatus({ ...status })}>
                                            Редактировать
                                        </button>

                                        <button
                                            type="button"
                                            onClick={async () => {
                                                await removeStatus(status.id);
                                                loadData();
                                            }}
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
        </main>
    )
}
export default EditCats