import '../index.css'
import backImage from '../assets/header-back.png'
import logo from '../assets/logo_no_background.png'
import left_paw from '../assets/long-paw-1.png'
import right_paw from '../assets/long-paw-2.png'
import { NavLink } from 'react-router-dom'

const LandingData = {
    cafe_name: 'Котокафе КОфеТерий'
}

function Header(){
    return (
        <header>
            <div>
                <img src={logo} alt="logo" />
                <h1>{LandingData.cafe_name}</h1>
            </div>
            <div>
                <img src={left_paw} alt="" />
                <nav>
                    <button><NavLink to={'/'}>О нас</NavLink></button>
                    <button><NavLink to={'/cats'}>Наши котики</NavLink></button>
                    <button><NavLink to={'/gallery'}>Галерея</NavLink></button>
                </nav>
                <img src={right_paw} alt="" />
            </div>
        </header>
    )
}
export default Header