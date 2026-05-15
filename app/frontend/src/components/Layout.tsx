import { Outlet } from "react-router-dom";
import Header from './Header'
import '../index.css'
function Layout(){
    return(
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default Layout