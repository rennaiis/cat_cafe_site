import type { LandingData, MyFile, Rule } from '../types'
import s from '../styles/landing.module.css'
import pawIcon1 from '../assets/paw-icon-1.png'
import pawIcon2 from '../assets/paw-icon-2.png'
import board from '../assets/board2.png'
import { FileCategory } from '../../../enums/FileCategory'
import { useEffect, useState } from 'react'
import { getLandingData } from '../API/LandingAPI'
import { getRules } from '../API/RulesAPI'
import { filesStorageURL, getFiles } from '../API/filesAPI'

function Landing(){ 
    async function loadData() {
        await getFiles().then((data: MyFile[])=>{
            setFiles(data.filter((file)=>file.category === FileCategory.LANDING_PHOTO))
        }).catch((err)=>console.error('loading files mistake: ', err))
    }
    useEffect(()=> {loadData()}, []) 

    const [files, setFiles] = useState<MyFile[]>([])
    const [landingData, setLandingData] =  useState<LandingData>()
    const [rules, setRules] =  useState<Rule[]>([])
    useEffect(()=>{
        getLandingData().then((data)=>{
            setLandingData(data)
        }).catch((err)=>console.error('loading landing mistake: ', err))
        getRules().then((data)=>{
            setRules(data)
        }).catch((err)=>console.error('loading rules mistake: ', err))
    }, []) 
    if (!landingData){
        return <div>Загрузка...</div>
    }
    return (
        <>
        <div className={s.galleryContainer}>
            <div className={s.rowWrapper} >
                <div className={s.rowPhotos}>
                    {files.filter((_, id)=>id%2 !== 0).map((photo, idx)=>(
                        <div  className={s.photoCard} key = {`${idx}-${photo.id}`}>
                            <img src={`${filesStorageURL}/${photo.path}`} alt="row1" />
                        </div>
                    ))}
                </div>
            </div>
            <div className={s.rowWrapper} >
                <div className={s.rowPhotos}>
                    {files.filter((_, id)=>id%2 === 0).map((photo, idx)=>(
                        <div className={s.photoCard} key = {`${idx}-${photo.id}`}>
                            <img src={`${filesStorageURL}/${photo.path}`} alt="row2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className={s.contentBlockLanding}>
            <div className={s.about + ' row '}>
            
            <div className={s.aboutContent}>
                <div className={s.boardContainer}>
                    <div className={s.board}>
                        <img src={board} className={s.boardImg}/>
                        <div className={s.boardText}>
                            <span className={s.title}>Уехали домой</span>
                            <span className={s.count}>{landingData.cats_at_home}</span>
                            <span className={s.title}>котиков</span>
                        </div>
                    </div>
                </div>
                <p className='bold-hover'>{landingData.about_us}</p>
            </div>
            
            </div>
            
            <div className={s.priceSection}>
            <h4 className={s.priceTitle}>Цены:</h4>

            <div className={s.priceContainer}>
                <div className={s.priceCard  + ' card'}>
                    <h3>Первый час</h3>
                    <div className={s.priceValue}> {landingData.first_hour_price_standart} руб./мин ({Number(landingData.first_hour_price_standart)*60} в час)</div>
                    <p className={s.priceNote}>Следующие часы:</p>
                    <div className={s.priceValue}> {landingData.following_hours_price_standart} руб./мин, {Number(landingData.following_hours_price_standart)*60} в час</div>
                </div>

                <div className={s.priceCard + ' card'}>
                <h3>Школьникам и студентам</h3>
                <div className={s.priceValue}> {landingData.students_price} руб./мин</div>
                <p className={s.priceNote}>По будням, с 01.09 по 31.05</p>
                <p className={s.priceNote}>при наличии студенческого</p>
                </div>

                <div className={s.priceCard + ' card'}>
                <h3>Группам от {landingData.group_people_amount} человек</h3>
                <div className={s.priceValue}>скидка {landingData.group_discount}%</div>
                <p className={s.priceNote}>{landingData.group_people_conditions}</p>
                </div>
            </div>
            </div>

            <h4 className='scale'>Контакты</h4>
            <div className={s.contactsContainer}>
                <iframe className={s.mapCard + ' scale'}
                    src={landingData.map_link}
                    loading="lazy">
                </iframe>
                <div>
                    <p className='bold-hover'>Наш адрес: {landingData.adress}</p>
                    <p className='bold-hover'>Телефон: {landingData.contact_phone}</p>
                    <p className='bold-hover'>E-mail: {landingData.contact_email}</p>
                    <p className='bold-hover'><a href={landingData.vk_link}>Группа вк</a></p>
                </div>

            </div>
            <h4 className='scale'>Правила: </h4>
            <div className='card'>
                <div className='card-content'>
                <h3>При входе</h3>
                {rules.filter((rule)=>rule.category == "При входе").map((rule: Rule, idx)=>(
                    <div className={s.rule} key={rule.id}>
                        <img className = 'paw-icon scale' src={idx % 2 === 0? pawIcon1 : pawIcon2} alt="" />
                        <p className='bold-hover'>{rule.text}</p>
                    </div>
                ))}
                <h3>В котокафе</h3>
                {rules.filter((rule)=>rule.category == "В котокафе").map((rule: Rule, idx)=>(
                    <div className={s.rule} key={rule.id}>
                        <img className = 'paw-icon scale' src={idx % 2 === 0? pawIcon1 : pawIcon2} alt="" />
                        <p className='bold-hover'>{rule.text}</p>
                    </div>
                ))}
                <h3>Посещение с детьми</h3>
                {rules.filter((rule)=>rule.category == "Посещение с детьми").map((rule: Rule, idx)=>(
                    <div className={s.rule} key={rule.id}>
                        <img className = 'paw-icon scale' src={idx % 2 === 0? pawIcon1 : pawIcon2} alt="" />
                        <p className='bold-hover'>{rule.text}</p>
                    </div>
                ))}
                <h3>Аллергия</h3>
                {rules.filter((rule)=>rule.category == "Аллергия").map((rule: Rule, idx)=>(
                    <div className={s.rule} key={rule.id}>
                        <img className = 'paw-icon scale' src={idx % 2 === 0? pawIcon1 : pawIcon2} alt="" />
                        <p className='bold-hover'>{rule.text}</p>
                    </div>
                ))}
                </div>
            </div>
            
        </div>
        
        </>
    )
}

export default Landing