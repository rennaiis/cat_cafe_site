import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authMe } from '../API/AutorizationAPI';
function AdminRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    authMe().then((res) => {
        if (res.data) {
          setIsAuthenticated(true)
        }
      })
      .catch(() => {
        setIsAuthenticated(false)
      })
  }, [])
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}
export default AdminRoute
