import { useNavigate, useParams } from 'react-router-dom';
import s from '../../styles/admin.module.css'
import galleryStyles from '../../styles/gallery.module.css';
import { getCats, getYearsAgo, updateCat } from '../../API/CatsAPI';
import type { Cat } from '../../types';
import { useEffect, useState, type ChangeEvent } from 'react';
import { CatGender } from '../../../../enums/CatGender';
import { createFiles, filesStorageURL, removeFile } from '../../API/filesAPI';
import { FileCategory } from '../../../../enums/FileCategory';
import { FileType } from '../../../../enums/FileType';


function EditCat(){
    
    const {id} = useParams<{id: string}>()
    const [cat, setCat] = useState<Cat | null>(null)
    const navigate = useNavigate()

    async function loadData() {
        await getCats().then((data: Cat[]) => {
            const foundCat = data.find((c) => c.id === Number(id));
            if (foundCat) {
                setCat({
                    ...foundCat,
                    birth_date: foundCat.birth_date ? new Date(foundCat.birth_date) : undefined,
                    accept_date: foundCat.accept_date ? new Date(foundCat.accept_date) : undefined,
                    adopt_date: foundCat.adopt_date ? new Date(foundCat.adopt_date) : undefined,
                });
            }
        }).catch((err) => console.error('loading cats mistake: ', err));
    }


    useEffect(()=> {loadData()}, [])
    const genders = Object.values(CatGender)
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const dto = {
                category: FileCategory.CAT_PHOTO,
                type: FileType.PHOTO, 
                is_approved: true,
                cat_id: cat?.id
            }
            try {
                await createFiles([file], dto)
                await loadData()
            } catch (error) {
                console.error('Ошибка при загрузке файла:', error);
            }
        }
    }
    const handleFormChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (!cat) return;
        if (name === 'age') {
            const newValue = getYearsAgo(Number(value))
            setCat({
                ...cat, 
                'birth_date': newValue
            });
        } else if ('type' in e.target && e.target.type === 'date') {
            const dateValue = value ? new Date(value) : undefined;
            setCat(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    [name]: dateValue
                } as Cat
            });
        } else {
            setCat({
                ...cat,
                [name]: value
            })
        }
    }

    async function editCat(e: React.FormEvent) {
        e.preventDefault()
        if (!cat) return
        try {
            if (!cat.name || !cat.status) {
                return
            }
            await updateCat({
                name: cat.name,
                description: cat.description,
                status_id: cat.status.id,
                gender: cat.gender,
                breed: cat.breed,
                accept_date: cat.accept_date ? new Date(cat.accept_date).toISOString().split('T')[0] : undefined,
                adopt_date: cat.adopt_date? new Date(cat.adopt_date).toISOString().split('T')[0] : undefined,
                birth_date: cat.birth_date ? new Date(cat.birth_date).toISOString().split('T')[0] : undefined,
            }, cat.id)
            navigate(-1)
            await loadData()            
        } catch (err) {
            console.error('create error', err)
        }
    }


    if (!cat){
        return(<></>)
    }
    return(
        <main className={s.container}>
            <h2>Редактировать кота</h2>
            <form onSubmit={editCat}>
                <div>
                    <label>Имя:</label>
                    <input 
                        name="name"
                        value={cat.name} 
                        onChange={handleFormChange} 
                        required
                    />
                </div>
                <div>
                    <label>Описание:</label>
                    <textarea 
                        name="description"
                        value={cat.description} 
                        onChange={handleFormChange} 
                        required
                    />
                </div>                   
                <div>
                    <label>Пол:</label>
                    <select
                        name='gender'
                        value={cat.gender}
                        onChange={handleFormChange}
                        required>
                        {genders.map((option)=>(
                            <option key={option} value={option}>{option}</option>                            
                        ))}
                    </select>
                </div>
                <div>
                    <label>Порода:</label>
                    <input 
                        name="breed"
                        value={cat.breed} 
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
                        value={(cat.accept_date instanceof Date && !isNaN(cat.accept_date.getTime())) 
                            ? cat.accept_date.toISOString().substring(0, 10) 
                            : ''
                        } 
                        onChange={handleFormChange} 
                    />
                </div>
                <div>
                    <label>Дата пристройства (не обязательно):</label>
                    <input 
                        type="date"
                        name="adopt_date"
                        value={(cat.adopt_date instanceof Date && !isNaN(cat.adopt_date.getTime())) 
                            ? cat.adopt_date.toISOString().substring(0, 10) 
                            : ''
                        } 
                        onChange={handleFormChange} 
                    />
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
                    {cat.files.map((file, index) => (
                        <div key={`${file.name}-${index}`} className={galleryStyles.previewItem}>
                            <img src={`${filesStorageURL}/${file.path}`} alt={file.name}/>
                            <button
                                type="button"
                                onClick={ async () =>{
                                   try {
                                        await removeFile(file.id);
                                        await loadData();                
                                    } catch (error) {
                                        console.error('Ошибка при удалении файла:', error);
                                    }
                                }}
                                className={galleryStyles.deleteButton}
                            > ✕ </button>
                        </div>
                    ))}
                </div>
                <button type='submit'>Сохранить изменения</button>
            </form>
        </main>
    )
}
export default EditCat