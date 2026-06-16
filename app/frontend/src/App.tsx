import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Cats from './pages/Cats'
import Gallery from './pages/Gallery'
import AdminLayout from './components/AdminLayout'
import Login from './pages/Login'
import EditCats from './pages/admin/EditCats'
import EditLanding from './pages/admin/EditLanding'
import EditUsers from './pages/admin/EditUsers'
import RecievedApplications from './pages/admin/RecievedApplications'
import ApplicationQuestions from './pages/admin/EditQuestions'
import EditGallery from './pages/admin/EditGallery'
import AddCat from './pages/admin/AddCat'
import AdoptApplicationForm from './pages/AdoptApplication'
import CatPage from './pages/CatPage'
import EditCat from './pages/admin/EditCat'

const router = createBrowserRouter([
   {
      path: '/',
      element: <Layout/>,
      children: [
         {index: true, element: <Landing/>}, 
         {path: 'cats', element: <Cats/>}, 
         {path: 'gallery', element: <Gallery/>}, 
         {path: 'login', element: <Login/>}, 
         {path: 'cats/:id', element: <CatPage/>},
         {path: 'adoptApplication', element: <AdoptApplicationForm/>}
      ],
   }, 
   {
      path: '/admin', 
      element: <AdminLayout/>, 
      children: [
         {index: true, element: <EditLanding/>},
         {path: 'editCats', element: <EditCats/>},
         {path: 'editCats/:id', element: <EditCat/>},
         {path: 'editLanding', element: <EditLanding/>}, 
         {path: 'editUsers', element: <EditUsers/>}, 
         {path: 'recievedApplications', element: <RecievedApplications/>}, 
         {path: 'editQuestions', element: <ApplicationQuestions/>}, 
         {path: 'editGallery', element:<EditGallery/>},
         {path: 'newCat', element: <AddCat/>}
      ]
   }
])
function App() {
   return <RouterProvider router={router}/>
}
export default App
