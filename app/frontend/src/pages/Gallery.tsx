import React, { useEffect, useState } from 'react';
import styles from '../styles/gallery.module.css';
import type { MyFile } from '../types';
import { FileType } from '../../../enums/FileType';
import { FileCategory } from '../../../enums/FileCategory';
import { createFiles, filesStorageURL, getFiles } from '../API/filesAPI';

function Gallery () {
    const [isSent, setIsSent] = useState<boolean>(false)
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const dto = {
                category: FileCategory.GALLERY_PHOTO,
                type: FileType.PHOTO, 
                is_approved: false
            }
            try {
                await createFiles([file], dto)
                loadData()
                setIsSent(true)
            } catch (error) {
                console.error('Ошибка при загрузке файла:', error);
                alert('Не удалось загрузить фото :( ')
            }
        }
    }
    
    function loadData() {
        getFiles().then((data: MyFile[])=>{
            setFiles(data.filter(file => file.type === FileType.PHOTO && file.category == FileCategory.GALLERY_PHOTO && file.is_approved))
            
        }).catch((err)=>console.error('loading rules mistake: ', err))
 
    }
    useEffect(()=> {loadData()}, [])
    const [files, setFiles] = useState<MyFile[]>([])
    return (
        <>
        <div className={styles.galleryContainer}>    
            <div className={styles.fileUploadContainer}>
                <label htmlFor="cat-file-upload" className={styles.fileUploadLabel}>
                    <span>📸 Будем рады вашим фото! (нажмите, чтобы загрузить) </span>
                </label>
                <input 
                    type="file" 
                    accept="image/*"
                    id="cat-file-upload"
                    className={styles.fileUploadInput}
                    onChange={handleFileChange}
                />            
            </div>
            {isSent ? 
                <div style={{padding: 20}}> Фото отправлены, отобразятся после одобрения ❤️</div>        
            : <></>}
            <div className={styles.grid}>
                {files.map((file) => (
                    <div key={file.id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <img 
                                src={`${filesStorageURL}/${file.path}`} 
                                alt={file.name} 
                                className={styles.image}
                                loading="lazy" 
                            />
                            <div className={styles.overlay}>
                                <span className={styles.catName}>
                                    {file.cat?.name}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default Gallery
