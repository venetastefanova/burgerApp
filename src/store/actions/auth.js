import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START

    }
 
}

export const authSuccess = (token,userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }

}

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error:error
    }

}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type:actionTypes.AUTH_LOGOUT
    };
}
export const checkAuthTimeout = (expirationTime) =>{
    return dispatch => { // dispatches log out after the token expires
        setTimeout(() =>{
            dispatch(logout());
        }, expirationTime*1000) // makes it in minutes
    }
}


export const auth = (email,password, isSignup) => {
    return dispatch=>{
      dispatch(authStart());
      const authData={ 
          email:email,
          password:password,
          returnSecureToken:true
      }
      let url ="https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCQB0wlBKjTf-p_2hbvnf9mk1tA5GyCU9Y";
      if(isSignup){
          url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCQB0wlBKjTf-p_2hbvnf9mk1tA5GyCU9Y"
      }
      axios.post(url, authData)
        .then(response=>{
            console.log(response);
            //setup so when we refresh the browser it keeps the session
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000) // a date that we pass a date as argument
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err =>{
            console.log(err);
            dispatch(authFail(err.response.data.error));
        })
  }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout())
        }
        else{
            const expirationDate = new Date(localStorage.getItem("expirationDate")) //converting the string from localStorage to a date
            if(expirationDate <= new Date()){ // logout if the time has expired
                dispatch(logout())
            }
            else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
            
        }
    }
}