import logo from '../assets/logo_no_background.png'
import { NavLink } from 'react-router-dom'
import s from '../styles/AdminHeader.module.css'
import { useState } from 'react';
function AdminHeader(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
         <header className={s.adminHeader}>
            <div> 
                <img src={logo} className={s.logo} alt="logo"/>
            </div>
            <button className={s.burgerButton} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '✕' : '☰'}
            </button>
            <nav className={`${s.nav} ${isOpen ? s.active : ''}`}>
                <button className={s.navButton}><NavLink to={'/admin/editLanding'}>Главная страница</NavLink></button>
                <button className={s.navButton}><NavLink to={'/admin/editCats'}>Коты</NavLink></button>
                <button className={s.navButton}><NavLink to={'/admin/editGallery'}>Галерея</NavLink></button>
                <button className={s.navButton}><NavLink to={'/admin/recievedApplications'}>Заявки</NavLink></button>
                <button className={s.navButton}><NavLink to={'/admin/editUsers'}>Пользователи</NavLink></button>
                <button className={s.navButton}><NavLink to={'/admin/editQuestions'}>Анкета</NavLink></button>
            </nav>
         </header>
        </>
    )
}

export default AdminHeader