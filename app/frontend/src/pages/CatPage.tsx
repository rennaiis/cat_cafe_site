import type { Cat } from "../types"
import style from "../styles/catPage.module.css" 
import { filesStorageURL } from "../API/filesAPI";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { calculateAge, getCats } from "../API/CatsAPI";

function CatPage() {
    const {id} = useParams<{id: string}>()
    const navigate = useNavigate()
    const formatDate = (date?: Date) => {
        if (!date) return "—";
        return new Date(date).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    function loadData() {
        getCats().then((data: Cat[])=>{
            const foundCat = data.find((c)=>c.id === Number(id))
            if (foundCat){
                setCat(foundCat)
                if (foundCat.files && foundCat.files.length > 0){
                    setMainPic(`${filesStorageURL}/${foundCat.files[0].path}`)
                }
            }    
        }).catch((err)=>console.error('loading cats mistake: ', err))
    }
    useEffect(()=> {loadData()}, [])
    const [cat, setCat] = useState<Cat | null>(null)
    const [mainPic, setMainPic] = useState<string>('')
    if (!cat) {
        return <div>Загрузка...</div>; 
    }
    return (
        <div className={style.container}>
            <button style={{margin: 10}} onClick={()=>{navigate(-1)}}>← Назад к списку </button>
            <div className={style.mainBlock}>
               <div className={style.photoColumn}>
                    {cat.files && cat.files.length > 0 ? (
                        <div>
                            <img 
                                src={mainPic}
                                alt={cat.name} 
                                className={style.mainImg}
                            />
                            
                            {cat.files.length > 1 && (
                                <div className={style.thumbsRow}>
                                    {cat.files.map((file, idx) => (
                                        <img 
                                            onClick={()=>{setMainPic(`${filesStorageURL}/${file.path}`)}}
                                            key={idx}
                                            src={`${filesStorageURL}/${file.path}`}
                                            alt={`${cat.name} фото ${idx + 2}`} 
                                            className={style.thumbImg}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className={style.noPhoto}>
                            <span>Нет фотографии 📷</span>
                        </div>
                    )}
                </div>

                <div className={style.infoColumn}>
                    <h1 className={style.title}>{cat.name}</h1>
                    
                    <div className={style.badgeWrapper}>
                        <span className={style.badge}>
                            {cat.status?.type}
                        </span>
                    </div>

                    <div className={style.featuresList}>
                        <div className={style.featureRow}>
                            <div className={style.featureLabel}>Пол:</div>
                            <div className={style.featureValue}>{cat.gender}</div>
                        </div>
                        {cat.breed ? 
                        <div className={style.featureRow}>
                            <div className={style.featureLabel}>Порода:</div>
                            <div className={style.featureValue}>{cat.breed}</div>
                        </div> : <></>}
                        {cat.birth_date?
                        <div className={style.featureRow}>
                            <div className={style.featureLabel}>Возраст:</div>
                            <div className={style.featureValue}>{calculateAge(cat.birth_date)}</div>
                        </div>
                        : <></>}
                    </div>
                </div>
            </div>

                <div className={style.descriptionSection}>
                    <h2 className={style.descriptionTitle}>О котике</h2>
                    {cat.description ? 
                        <p className={style.descriptionText}>{cat.description}</p>
                    : <p className={style.descriptionText}>{`Пока не рассказал 🐱`}</p>}
                    
                </div>

            <div className='card'>
                <h3 className={style.historyTitle}>История в приюте</h3>
                <div className={style.historyList}>
                    {cat.accept_date && (
                        <div>📅 <strong>Поступил(а) к нам:</strong> {formatDate(cat.accept_date)}</div>
                    )}
                    {cat.adopt_date && (
                        <div>🏠 <strong>Обрел(а) дом:</strong> {formatDate(cat.adopt_date)}</div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default CatPage
