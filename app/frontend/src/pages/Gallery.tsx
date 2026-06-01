import React from 'react';
import styles from '../styles/gallery.module.css';
import { filesListTest } from '../test/testFiles';
import type { MyFile } from '../types';
import { FileType } from '../../../enums/FileType';

const files: MyFile[] = filesListTest
function Gallery () {
    const approvedImages = files.filter(file => file.type === FileType.PHOTO && file.is_approved !== false);
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
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            alert(`Файл ${e.target.files[0].name} выбран!`);
                        }
                    }}
                />            
            </div>        
            <div className={styles.grid}>
                {approvedImages.map((file) => (
                    <div key={file.id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <img 
                                src={`${file.path}/${file.name}`} 
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
