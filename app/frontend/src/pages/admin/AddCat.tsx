import { useEffect, useState, type ChangeEvent } from 'react'
import s from '../../styles/admin.module.css'
import galleryStyles from '../../styles/gallery.module.css';

import type { Adopter, Cat, objectWithId, Status } from '../../types'
import { getStatuses } from '../../API/StatusesAPI'
import { CatGender } from '../../../../enums/CatGender'
import { createCatWithFiles, getYearsAgo } from '../../API/CatsAPI'
import { getAdopters } from '../../API/AdoptersAPI'
import { useNavigate } from 'react-router-dom'


function AddCat(){
    const [statuses, setStatuses] = useState<Status[]>([])
    const [adopters, setAdopters] = useState<Adopter[]>([])
    const [files, setFiles] = useState<File[]>([])
    const navigate = useNavigate()
    const [newCat, setNewCat] = useState<Omit<Cat, 'id'>>({
        name: '', 
        description: '', 
        status: undefined,
        gender: CatGender.FEMALE,
        breed: '', 
        accept_date: undefined, 
        adopt_date: undefined, 
        birth_date: undefined, 
        files: []
    })
    async function loadData() {
        await getStatuses().then((data)=>{
            setStatuses(data)
            if (data.length > 0) {
                setNewCat(prev => ({ ...prev, status: data[0] }))
            }
        }).catch((err)=>console.error('loading statuses mistake: ', err))
        await getAdopters().then((data)=>{
            setAdopters(data)
        }).catch((err)=>console.error('loading adopters mistake: ', err))
    }
    const genders = Object.values(CatGender)
    const handleRelationChange = <T extends objectWithId>(
        fieldName: keyof Omit<Cat, 'id'>, 
        dataSource: T[]
    ) => {
        return (e: ChangeEvent<HTMLSelectElement>) => {
            const selectedId = Number(e.target.value)
            const foundObject = dataSource.find(item => item.id === selectedId);
            if (foundObject) {
                setNewCat(prev => ({
                    ...prev,
                    [fieldName]: foundObject
                }))
            }
        }
    }
    const handleFormChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name == 'age'){
            const newValue = getYearsAgo(Number(value))
            setNewCat({
                ...newCat, 
                'birth_date' : newValue
            })
        }else if ('type' in e.target && e.target.type === 'date'){
            const localDate = value ? new Date(value.replace(/-/g, '/')) : new Date(); 
            setNewCat(prev => ({
                ...prev,
                [name]: localDate
            }))
        } else {
            setNewCat({
                ...newCat,
                [name]: value
            })
        }
    }

    const removeFile = (index: number) => {
        setFiles(prev =>
            prev.filter((_, i) => i !== index)
        )
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files){
            setFiles(prev => [
                ...prev,
                ...Array.from(files)
            ])
        }
    }

    async function addNewCat(e: React.FormEvent) {
        e.preventDefault()
        try {
            if (!newCat.name || !newCat.status) {
                return
            }
            await createCatWithFiles({
                name: newCat.name,
                description: newCat.description,
                status_id: newCat.status.id,
                gender: newCat.gender,
                breed: newCat.breed,
                accept_date: newCat.accept_date ? new Date(newCat.accept_date).toISOString().split('T')[0] : undefined,
                adopt_date: newCat.adopt_date? new Date(newCat.adopt_date).toISOString().split('T')[0] : undefined,
                birth_date: newCat.birth_date ? new Date(newCat.birth_date).toISOString().split('T')[0] : undefined,       
            }, files)
            navigate(-1)
            loadData()            
        } catch (err) {
            console.error('create error', err)
        }
    }

    useEffect(()=> {loadData()}, [])
    
    return (
        <main className={s.container}>
            <h2>Новый кот</h2>
            <form onSubmit={addNewCat}>
                <div>
                    <label>Статус:</label>
                    <select
                        name='status'
                        value={newCat.status?.id || ''}
                        onChange={handleRelationChange('status', statuses)}
                        required>
                        {statuses.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.status}
                            </option>                            
                        ))}
                    </select>
                </div>
                <div>
                    <label>Имя:</label>
                    <input 
                        name="name"
                        value={newCat.name} 
                        onChange={handleFormChange} 
                        required
                    />
                </div>
                <div>
                    <label>Описание:</label>
                    <textarea 
                        name="description"
                        value={newCat.description} 
                        onChange={handleFormChange} 
                        required
                    />
                </div>                   
                <div>
                    <label>Пол:</label>
                    <select
                        name='gender'
                        value={newCat.gender}
                        onChange={handleFormChange}
                        required>
                        {genders.map((option)=>(
                            <option key={option} value={option}>{option}</option>                            
                        ))}
                    </select>
                </div>
                <div>
                    <label>Порода (не обязательно):</label>
                    <input 
                        name="breed"
                        value={newCat.breed} 
                        onChange={handleFormChange} 
                    />
                </div>                
                <div>
                    <label>Возраст (укажите примерное количество лет, например 6.5 - шесть с половиной):</label>
                    <input 
                        type='number'
                        name="age"
                        onChange={handleFormChange} 
                    />
                </div>             
                <div>
                    <label>Дата приёма в приют (не обязательно):</label>
                    <input 
                        type="date"
                        name="accept_date"
                        value={newCat.accept_date ? newCat.accept_date.toISOString().substring(0, 10) : ''} 
                        onChange={handleFormChange} 
                    />
                </div>
                <div>
                    <label>Дата пристройства (не обязательно):</label>
                    <input 
                        type="date"
                        name="adopt_date"
                        value={newCat.adopt_date ? newCat.adopt_date.toISOString().substring(0, 10) : ''} 
                        onChange={handleFormChange} 
                    />
                </div>
                <div>
                    <label>Человек, который приютил:</label>
                    <select
                        name='adopter'
                        value={newCat.adopter?.id || ''}
                        onChange={handleRelationChange('adopter', adopters)}
                        >
                        {adopters.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.first_name + " " + option.last_name}
                            </option>                            
                        ))}
                    </select>
                </div>
                <div className={galleryStyles.fileUploadContainer}>
                    <label htmlFor="cat-file-upload" className={galleryStyles.fileUploadLabel}>
                        <span> Прикрепить фото кота (нажмите, чтобы загрузить) </span>
                    </label>
                    <input 
                        type="file" 
                        accept="image/*"
                        id="cat-file-upload"
                        className={galleryStyles.fileUploadInput}
                        onChange={handleFileChange}
                    />
                </div> 
                <div className={galleryStyles.previewContainer}>
                    {files.map((file, index) => (
                        <div key={`${file.name}-${index}`} className={galleryStyles.previewItem}>
                            <img src={URL.createObjectURL(file)} alt={file.name}/>
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className={galleryStyles.deleteButton}
                            > ✕ </button>
                        </div>
                    ))}
                </div>
                <button type='submit'>Добавить кота</button>
            </form>
        </main>
    )
}
export default AddCat