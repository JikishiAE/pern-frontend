import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginRegisterPage } from '../features/auth';

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="login" element={ <LoginRegisterPage /> } />

        <Route path='/*' element={ <Navigate to="/auth/login" /> } />
    </Routes>
  )
}
