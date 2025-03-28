import { AlertAdapter, httpClient } from '../../utils';
import { checkingCredentials, logout, login } from './';

const http = httpClient.getInstance();

const alertAdapter = AlertAdapter.getInstance();

export const checkingAuthentication = () => {
    return async( dispatch: any ) => {

        dispatch( checkingCredentials() );
        
    }
}

export const registerUser = (user: any) => {
    return async( dispatch: any ) => {

        try {
            const result = await http.post(`api/auth/register`, user);

            saveLogin(dispatch, result.token, result.user.name, result.user.email);
            
        } catch (err: any) {
            //setError('Error fetching data');
            alertAdapter.basicAlert({title: 'Error', text: err?.error, icon: 'error'});
        } 
        // finally {
        //     setIsLoading(false);
        // }
        
        
        
    }
}

export const loginUser = (user: any) => {
    return async( dispatch: any ) => {

        //console.log(import.meta.env);
        try {
            const result = await http.post(`api/auth/login`, user);

            saveLogin(dispatch, result.token, result.user.name, result.user.email);
            
        } catch (err: any) {
            //setError('Error fetching data');
            //console.log(err);
            
            alertAdapter.basicAlert({title: 'Error', text: err?.error, icon: 'error'});
        } 
        // finally {
        //     setIsLoading(false);
        // }
        
        
        
    }
}

export const logoutUser = () => {
    return async( dispatch: any ) => {

        //console.log(import.meta.env);
        try {

            dispatch( logout({}) );

            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            
        } catch (err) {
            //setError('Error fetching data');
        } 
        // finally {
        //     setIsLoading(false);
        // }
        
        
        
    }
}

const saveLogin = (dispatch: any, token: string, name: string, email: string) => {

    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);

    dispatch( login({
        email: email,
        name: name,
        token: token
    }) );

}