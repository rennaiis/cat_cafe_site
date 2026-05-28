import type { Cat } from "../types"
import style from "../styles/catPage.module.css" 
import { calculateAge, getYearsAgo } from "../test/testCatsList";

interface CatPageProps {
    cat: Cat;
}

function CatPage({ cat }: CatPageProps) {
    const formatDate = (date?: Date) => {
        if (!date) return "—";
        return new Date(date).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className={style.container}>
            
               <div className={style.mainBlock}>
               <div className={style.photoColumn}>
                    {cat.files && cat.files.length > 0 ? (
                        <div>
                            <img 
                                src={`${cat.files[0].path}/${cat.files[0].name}`} 
                                alt={cat.name} 
                                className={style.mainImg}
                            />
                            
                            {cat.files.length > 1 && (
                                <div className={style.thumbsRow}>
                                    {cat.files.slice(1).map((file, idx) => (
                                        <img 
                                            key={idx}
                                            src={`${file.path}/${file.name}`} 
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
                            {cat.status.type}
                        </span>
                    </div>

                    <div className={style.featuresList}>
                        <div className={style.featureRow}>
                            <div className={style.featureLabel}>Пол:</div>
                            <div className={style.featureValue}>{cat.gender}</div>
                        </div>
                        {cat.birth_date?
                        <div className={style.featureRow}>
                            <div className={style.featureLabel}>возраст:</div>
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
