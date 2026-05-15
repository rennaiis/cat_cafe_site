import '../index.css'
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
            <div className='header-line'>
                <img src={logo} alt="logo" className='logo'/>
                <h1 className='header'>{LandingData.cafe_name}</h1>
            </div>
            <div className='menu-line'>
                {/* <img src={left_paw} alt="" className='nav-paw'/> */}
                <nav className='inline-flex'>
                    <button><NavLink to={'/'}>О нас</NavLink></button>
                    <button><NavLink to={'/cats'}>Наши котики</NavLink></button>
                    <button><NavLink to={'/gallery'}>Галерея</NavLink></button>
                </nav>
                {/* <img src={right_paw} alt="" className='nav-paw'/> */}
                <div className="header-bg-overlay"></div>
            </div>
        </header>
    )
}
export default Header