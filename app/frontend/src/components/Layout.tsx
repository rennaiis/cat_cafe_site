import { Outlet } from "react-router-dom";
import Header from './Header'
import '../index.css'
import backImage from '../assets/header-back.png'
function Layout(){
    return(
        <div className='page-wrapper'>
            {/* <img src={backImage} alt="" className='background-header-img bg-long'/> */}
            <Header/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default Layout