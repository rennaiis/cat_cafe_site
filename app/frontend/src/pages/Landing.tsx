import type { LandingData, MyFile, Rule } from '../types'
import { FileType } from '../../../enums/FileType'
import s from '../styles/landing.module.css'
import pawIcon1 from '../assets/paw-icon-1.png'
import pawIcon2 from '../assets/paw-icon-2.png'
import board from '../assets/board2.png'
import { FileCategory } from '../../../enums/FileCategory'
import { LandingItemType } from '../../../enums/LandingItemType'

// const picUrl = "http://localhost:3000/passportFiles/"
const picUrl = './photos'
const photos_list: MyFile[] = [
    {
        id: 1, 
        path: '/files', 
        name: 'photo1.jpg', 
        type: FileType.PHOTO, 
        category: FileCategory.LANDING_PHOTO
    },
    {
        id: 2, 
        path: '/files', 
        name: 'photo2.jpg', 
        type: FileType.PHOTO, 
        category: FileCategory.LANDING_PHOTO
    },
    {
        id: 3, 
        path: '/files', 
        name: 'photo3.jpg', 
        type: FileType.PHOTO, 
        category: FileCategory.LANDING_PHOTO
    },
    {
        id: 4, 
        path: '/files', 
        name: 'photo4.jpg', 
        type: FileType.PHOTO, 
        category: FileCategory.LANDING_PHOTO
    },
    {
        id: 5, 
        path: '/files', 
        name: 'photo5.jpg', 
        type: FileType.PHOTO, 
        category: FileCategory.LANDING_PHOTO
    },
    {
        id: 6, 
        path: '/files', 
        name: 'photo6.jpg', 
        type: FileType.PHOTO, 
        category: FileCategory.LANDING_PHOTO
    },
    {
        id: 7, 
        path: '/files', 
        name: 'photo7.jpg', 
        type: FileType.PHOTO, 
        category: FileCategory.LANDING_PHOTO
    },
    {
        id: 8, 
        path: '/files', 
        name: 'photo8.jpg', 
        type: FileType.PHOTO, 
        category: FileCategory.LANDING_PHOTO
    }
]
const rules: Rule[] = [
    {
        id: 1, 
        text: `В котокафе нельзя 
        входить в уличной обуви. Вы
        можете надеть наши тапки, которые моются и обрабатываются после каждого посетителя.`,
        category:  `При входе`
    }, 
    {
        id: 2, 
        text: `Перед общением с животными Вам необходимо обработать руки антисептиком`,
        category:  `При входе`
    }, 
    {
        id: 3, 
        text: `Нельзя приносить с собой других животных во избежание заноса инфекций и стресса нашего котоперсонала`,
        category:  `При входе`
    }, 
    {
        id: 4, 
        text: `Коты - существа своенравные, любящие свободу. Поэтому мы просим не брать их на руки, не стеснять их свободу ПРОТИВ ИХ ВОЛИ;`,
        category:  `В котокафе`
    }, 
    {
        id: 5, 
        text: `Фотографировать котиков БЕЗ вспышки. Будем рады Вашим фото`,
        category:  `В котокафе`
    }, 
    {
        id: 6, 
        text: `У нас запрещено распивать алкогольные напитки, курить`,
        category:  `В котокафе`
    }, 
    {
        id: 7, 
        text: `У нас самообслуживание. Чай, кофе можно попросить у администратора`,
        category:  `В котокафе`
    }, 
    {
        id: 8, 
        text: `Не рекомендуем приносить с собой еду из гигиенических соображений. Как правило, 
        животные проявляют большой интерес к человеческой пище. Поесть спокойно они не дадут`,
        category:  `В котокафе`
    }, 
    {
        id: 9, 
        text: `Маленькие дети допускаются в возрасте ОТ 3 ЛЕТ.
        Ответственность за детей лежит на его родителе(-ях) или сопровождающем взрослом!`,
        category:  `Посещение с детьми`
    }, 
    {
        id: 10, 
        text: `Мы не рекомендуем посещать заведение людям с ярко выраженной аллергией на шерсть. Администрация заведения
         НЕ НЕСЕТ ответственности за проявление аллергических реакций у посетителей.`,
        category:  `Аллергия`
    }, 
    {
        id: 11, 
        text: `- Администратор имеет право сделать 
        Вам/Вашему ребенку замечание, попросить не трогать животное в данный момент;`,
        category:  `В котокафе`
    }, 
    {
        id: 12, 
        text: `Администратор имеет право удалить посетителя, если он нарушает правила заведения, 
        мучает кошек и не прислушивается к просьбам администратора, БЕЗ возврата денег за посещение`,
        category:  `В котокафе`
    }, 


    
]
const landingData: LandingData = {
    [LandingItemType.ABOUT_US]: `Первое КотоКафе в Ярославле!🐈💛!
    Чай, кофе, игры, WI-FI, кототерапия. У нас вы можете уютно провести
     время и найти верного друга!`,
    [LandingItemType.CAFE_NAME]: 'Котокафе КОфеТерий', 
    [LandingItemType.CATS_AT_HOME]: 195, 
    [LandingItemType.CATS_IN_CAFE]: 10,
    [LandingItemType.FIRST_HOUR_PRICE_STANDART]:7, 
    [LandingItemType.FOLLOWING_HOURS_PRICE_STANDART]:5, 
    [LandingItemType.GROUP_DISCOUNT]:10, 
    [LandingItemType.GROUP_PEOPLE_AMOUNT]:10,
    [LandingItemType.GROUP_CONDITIONS]:'Скидки не суммируются', 
    [LandingItemType.STUDENTS_PRICE]: 5, 
    [LandingItemType.STUDENTS_CONDITIONS]: `По будням, с 01.09 по 31.05, 
    при наличии студенческого билета,
     искоючая новогодние каникулы`,
    [LandingItemType.MAP_LINK]: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1919.1349013717768!2d39.87826205194287!3d57.633752011409975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b2915bc7e1249d%3A0xe8f9ea1f602418c4!2z0JrQvtGC0L7QmtCw0YTQtSDQmtCe0YTQtdCi0LXRgNC40Lk!5e0!3m2!1sru!2sru!4v1779557427938!5m2!1sru!2sru',
    [LandingItemType.CONTACT_PHONE]: '+79201235426', 
    [LandingItemType.CONTACT_EMAIL]: 'cats@gmail.com', 
    [LandingItemType.VK_LINK]: 'https://vk.com/catcafe_yar?w=club115152734',
    [LandingItemType.ADRESS]: 'г. Ярославль, ул. Республиканская, 32'
}

const row1 = photos_list.filter((_, id)=>id%2 !== 0)
const row2 = photos_list.filter((_, id)=>id%2 === 0)
const dubleRow1 = [...row1, ...row1, ...row1]
const dubleRow2 = [...row2, ...row2, ...row2]

function Landing(){    
    return (
        <>
        <div className={s.galleryContainer}>
            <div className={s.rowWrapper} >
                <div className={s.rowPhotos}>
                    {dubleRow1.map((photo, idx)=>(
                        <div className='photo-card scale' key = {`${idx}-${photo.id}`}>
                            <img     src={`${photo.path}/${photo.name}`} alt="row1" />
                        </div>
                    ))}
                </div>
            </div>
            <div className={s.rowWrapper} >
                <div className={s.rowPhotos}>
                    {dubleRow2.map((photo, idx)=>(
                        <div className='photo-card scale' key = {`${idx}-${photo.id}`}>
                            <img  src={`${photo.path}/${photo.name}`} alt="row2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className='content-block'>
            <div className={s.about + ' row '}>
            <p className='bold-hover'>{landingData.about_us}</p>
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
            </div>
            <h4 className='scale'>Правила: </h4>
            <div className='card card-rules'>
                <div className='card-content'>
                {rules.map((rule: Rule, idx)=>(
                    <div className={s.rule} key={rule.id}>
                        <img className = 'paw-icon scale' src={idx % 2 === 0? pawIcon1 : pawIcon2} alt="" />
                        <p className='bold-hover'>{rule.text}</p>
                    </div>
                ))}
                </div>
            </div>
            <h4 className='scale'>Цены</h4>
            <div className='row'>
                <div className={s.priceCard + ' card scale'}>
                    <p>Первый час</p>
                    <p>{landingData.first_hour_price_standart} руб./мин</p>
                    <p>{landingData.first_hour_price_standart*60} в час</p>

                    <p>Следующие часы</p>
                    <p>{landingData.following_hours_price_standart} руб./мин</p>
                    <p>{landingData.following_hours_price_standart*60} в час</p>
                </div>
                <div className={s.priceCard + ' card scale'}>
                    <p>Школьникам и студентам</p>
                    <p>{landingData.students_price} руб./мин</p>
                    <p>{landingData.students_conditions}</p>
                </div>

                <div className={s.priceCard + ' card scale'}>
                    <p>Группам от {landingData.group_people_amount} человек</p>
                    <p>скидка {landingData.group_discount}%</p>
                    <p>{landingData.group_people_conditions}</p>
                </div>
            </div>
            <h4 className='scale'>Контакты</h4>
            <div className='row'>
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
            
        </div>
        
        </>
    )
}

export default Landing