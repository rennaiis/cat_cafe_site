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
import AdoptApplication from './pages/AdoptApplication'
import RecievedApplications from './pages/admin/RecievedApplications'
import ApplicationQuestions from './pages/admin/EditQuestions'
import EditGallery from './pages/admin/EditGallery'
import { catsListTest } from './test/testCatsList'
import CLients from './pages/admin/Clients'

const router = createBrowserRouter([
   {
      path: '/',
      element: <Layout/>,
      children: [
         {index: true, element: <Landing/>}, 
         {path: 'cats', element: <Cats/>}, 
         {path: 'gallery', element: <Gallery/>}, 
         {path: 'login', element: <Login/>}, 
         {path: 'adoptApplication', element: <AdoptApplication/>}
      ],
   }, 
   {
      path: '/admin', 
      element: <AdminLayout/>, 
      children: [
         {index: true, element: <EditLanding/>},
         {path: 'editCats', element: <EditCats/>},
         {path: 'editLanding', element: <EditLanding/>}, 
         {path: 'editUsers', element: <EditUsers/>}, 
         {path: 'recievedApplications', element: <RecievedApplications/>}, 
         {path: 'editQuestions', element: <ApplicationQuestions/>}, 
         {path: 'editGallery', element:<EditGallery/>},
         {path: 'clients', element: <CLients/>}
      ]
   }
])
function App() {
   return <RouterProvider router={router}/>
}
export default App
