import { calculateAge, catsListTest } from "../../test/testCatsList"
import s from '../../styles/admin.module.css'
import { useEffect, useState, type ChangeEvent } from "react"
import type { Status } from "../../types"
import { StatusType } from "../../../../enums/StatusType"
import { createStatus, getStatuses, removeStatus, updateStatus } from "../../API/StatusesAPI"
function EditCats(){
    const [statusForm, setStatusForm] = useState<Omit<Status, 'id'>>({
        status: '', 
        color: '#FFFFFF', 
        type: StatusType.IN_CAFE
    })
    const [editedStatus, setEditedStatus] = useState<Status | null>(null)
    const [statuses, setStatuses] = useState<Status[]>([])
    function loadData() {
        getStatuses().then((data)=>{
            setStatuses(data)
        }).catch((err)=>console.error('loading statuses mistake: ', err))
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
    
    return (
        <main className={s.container}>
        <h2>Статусы</h2>
            <form onSubmit={addNewStatus}>
                <h3>Добавить новый статус</h3>
                <div>
                    <label>Тип статуса:</label>
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