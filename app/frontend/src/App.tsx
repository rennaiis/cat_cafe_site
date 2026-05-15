import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Cats from './pages/Cats'
import Gallery from './pages/Gallery'
const router = createBrowserRouter([
   {
      path: '/',
      element: <Layout/>,
      children: [
         {index: true, element: <Landing/>}, 
         {path: 'cats', element: <Cats/>}, 
         {path: 'gallery', element: <Gallery/>}
      ]
   }
])
function App() {
   return <RouterProvider router={router}/>
}

export default App
