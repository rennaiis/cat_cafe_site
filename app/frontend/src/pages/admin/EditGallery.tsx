import { useEffect, useState } from 'react';
import { approveFile, createFiles, filesStorageURL, getFiles, removeFile } from '../../API/filesAPI';
import galleryStyles from '../../styles/gallery.module.css';
import s from '../../styles/admin.module.css'


import type { MyFile } from '../../types';
import { FileCategory } from '../../../../enums/FileCategory';
import { FileType } from '../../../../enums/FileType';
function EditGallery(){
    function loadData(){
        getFiles().then((data: MyFile[])=>{
            setApprovedFiles(data.filter((file)=> file.is_approved === true && file.category === FileCategory.GALLERY_PHOTO))
            setNewFiles(data.filter((file)=> file.is_approved !== true && file.category === FileCategory.GALLERY_PHOTO))
        }).catch((err)=>console.error('loading rules mistake: ', err))
    }
    async function deleteFile(id: number) {
        await removeFile(id)
        loadData()
    }
    async function approveGalleryFile(id: number) {
        await approveFile(id)
        loadData()
    }
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const dto = {
                category: FileCategory.GALLERY_PHOTO,
                type: FileType.PHOTO, 
                is_approved: true,
            }
            try {
                await createFiles([file], dto)
                loadData()
            } catch (error) {
                console.error('Ошибка при загрузке файла:', error);
            }
        }
    }
    useEffect(()=> {loadData()}, [])
    const [approvedfiles, setApprovedFiles] = useState<MyFile[]>([])
    const [newFiles, setNewFiles] = useState<MyFile[]>([])
    return(
        <main className={s.container}>
            <h3>Новые файлы от пользователей</h3>
            <div className={galleryStyles.previewContainer}>
                {newFiles.map((file, index) => (
                    <div key={`${file.name}-${index}`} className={galleryStyles.previewItem}>
                        <img src={`${filesStorageURL}/${file.path}`}/>
                        <button
                            type="button"
                            onClick={() => deleteFile(file.id)}
                            className={galleryStyles.deleteButton}
                        > ✕ </button>
                        <button
                            type="button"
                            onClick={() => approveGalleryFile(file.id)}
                            className={galleryStyles.approveButton}
                        > ✓  </button>
                    </div>
                ))}
            </div>
            <h3>Файлы галереи</h3>
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
                    {approvedfiles.map((file, index) => (
                        <div key={`${file.name}-${index}`} className={galleryStyles.previewItem}>
                            <img src={`${filesStorageURL}/${file.path}`}/>
                            <button
                                type="button"
                                onClick={() => deleteFile(file.id)}
                                className={galleryStyles.deleteButton}
                            > ✕ </button>
                            
                        </div>
                    ))}
                </div>            

        </main>
    )
}
export default EditGallery