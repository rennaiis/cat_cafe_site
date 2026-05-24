import { Outlet } from "react-router-dom";
import Header from './Header'
import backImage from '../assets/header-back.png'
import Footer from "./Footer";
function Layout(){
    return(
        <div className='page-wrapper'>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default Layout