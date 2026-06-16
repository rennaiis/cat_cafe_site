import { NavLink } from 'react-router-dom'

function Footer(){
    return(
        <div className='footer-text'>
        <p>© 2026 КотоКафе "КОфеТерий"</p>
        <NavLink to={'/login'}>Для сотрудников</NavLink>
        <NavLink to={'/'}>На главную</NavLink>
        </div>
    )
    
}

export default Footer