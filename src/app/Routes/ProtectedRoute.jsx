import { Navigate } from 'react-router-dom'
import { authService } from '../../shared/services/authService'

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem(authService.key)
  return user ? children : <Navigate to="/" replace />
}
