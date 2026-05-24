import logo from '../assets/logo_no_background.png'
import left_paw from '../assets/long-paw-1.png'
import right_paw from '../assets/long-paw-2.png'
import { NavLink } from 'react-router-dom'
import s from '../styles/header.module.css'

const LandingData = {
    cafe_name: 'Котокафе КОфеТерий'
}
function Header(){
    return (  
        <header className={s.headerBack}>
            <div className={s.headerLine}>
                <img src={logo} alt="logo" className={s.logo + ' scale'}/>
                <h1 className={s.header + ' scale'} >{LandingData.cafe_name}</h1>
            </div>
            <nav className={s.menuLine}>
                    <button className={s.navButtons + ' scale'}><NavLink to={'/'}>О нас</NavLink></button>
                    <button className={s.navButtons + ' scale'}><NavLink to={'/cats'}>Наши котики</NavLink></button>
                    <button className={s.navButtons + ' scale'}><NavLink to={'/gallery'}>Галерея</NavLink></button>
                    <button className={s.navButtons + ' scale'}><NavLink to={'/adoptApplication'}>Приютить</NavLink></button>
                <div className="header-bg-overlay"></div>
            </nav>
        </header>
    )
}
export default Header