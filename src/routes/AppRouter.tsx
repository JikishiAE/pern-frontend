import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from './AuthRoutes';
import { useCheckAuth } from '../hooks';


export const AppRouter = () => {

  const status = useCheckAuth();

  // if ( status === 'checking' ) {
  //   return <CheckingAuth />
  // }

  return (
    <Routes>

        {
          (status === 'authenticated')
           ? <Route path="/*" element={ <Navigate to='/' /> } />
           : 
           (
              <>
                <Route path="/auth/*" element={ <AuthRoutes /> } />
                {/* <Route path="/*" element={ <PortfolioRoutes /> } /> */}
              </>
           )
        }

        <Route path='/*' element={ <Navigate to='/' />  } />

    </Routes>
  )
}
