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
    return {
        type:actionTypes.AUTH_LOGOUT
    };
}
export const checkAuthTimeut = (expirationTime) =>{
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
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeut(response.data.expiresIn));
        })
        .catch(err =>{
            console.log(err);
            dispatch(authFail(err.response.data.error));
        })
  }
}
