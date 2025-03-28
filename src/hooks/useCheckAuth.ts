
import { useSelector } from 'react-redux';

interface RootAuthState {
    auth: {
      status: string;
    };
  }

export const useCheckAuth = () => {
  
    const { status } = useSelector( (state: RootAuthState) => state.auth );
    // const dispatch = useDispatch();

    // useEffect(() => {
        
    //     onAuthStateChanged( FirebaseAuth, async( user: { uid: any; email: any; name: any; } ) => {
    //         if ( !user ) return dispatch( logout(null) );

    //         const { uid, email, name } = user;
    //         dispatch( login({ uid, email, name }) );
    //     })
    // }, []);

    return status;
}
