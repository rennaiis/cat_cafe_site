import { Outlet } from "react-router-dom"
import AdminHeader from "./AdminHeader"
import Footer from "./Footer"

function AdminLayout(){
    return(
        <div className='page-wrapper'>
            <AdminHeader/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default AdminLayout