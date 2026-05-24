import logo from '../assets/logo_no_background.png'
import { NavLink } from 'react-router-dom'
import s from '../styles/AdminHeader.module.css'
function AdminHeader(){
    return(
        <>
         <header className={s.adminHeader}>
            <div> 
                <img src={logo} className={s.logo} alt="logo"/>
            </div>
            <nav>
                <button className={s.navButton}><NavLink to={'/admin/editLanding'}>Главная страница</NavLink></button>
                <button className={s.navButton}><NavLink to={'/admin/editCats'}>Коты</NavLink></button>
                <button className={s.navButton}><NavLink to={'/admin/editGallery'}>Галерея</NavLink></button>
                <button className={s.navButton}><NavLink to={'/admin/recievedApplications'}>Заявки</NavLink></button>
                <button className={s.navButton}><NavLink to={'/admin/editQuections'}>Пользователи</NavLink></button>
                <button className={s.navButton}><NavLink to={'/admin/editGallery'}>Редактировать анкету</NavLink></button>
            </nav>
         </header>
        </>
    )
}

export default AdminHeader