import { 
    SET_USER, 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    SET_UNAUTHENTICATED,
    SET_AUTHENTICATED,
    LOADING_USER,
    MARK_NOTIFICATIONS_READ
} from '../types'
import axios from 'axios'

export const loginUser = (userData,history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios
    .post('/login',userData)
    .then((res)=>{
        setAutherizationToken(res.data.token)
        dispatch(getUserData())
        dispatch({type:CLEAR_ERRORS})
        history.push('/');                      //Redirect to home page
    })
    .catch(err=>{
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    })
}

export const signUpWithGoogle = () => (dispatch) =>{
    dispatch({ type : LOADING_UI })

    axios.post('/signUpGoogle')
        .then((res)=>{
           console.log(res)
        }).catch(err=>{
            console.log(err);
        })
}

export const signupUser = (newUser,history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios
    .post('/signup',newUser)
    .then((res)=>{
        setAutherizationToken(res.data.token)
        dispatch(getUserData())
        dispatch({type:CLEAR_ERRORS})
        history.push('/');
    })
    .catch(err=>{
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    })
}

export const logoutUser = () => (dispatch) =>{
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization']
    dispatch({ type: SET_UNAUTHENTICATED });
}

export const uploadImage =(formData) => (dispatch) => {
    dispatch({ type: LOADING_USER})
    axios.post('/user/uploadImage',formData)
        .then(()=>{
            dispatch(getUserData())
        })
        .catch(err=>console.log(err))
        
}

export const getUserData = () => (dispatch) =>{
    dispatch({ type:LOADING_USER })
    axios.get('/user')
        .then(res=>{
            dispatch({
                type:SET_USER,
                payload:res.data
            })
        })
        .catch(err=>console.log(err))
}

export const editUserDetails = (userDetails) => (dispatch) =>{
    dispatch({ type :LOADING_USER })
    axios
    .post('/user',userDetails)
        .then(()=>{
            dispatch(getUserData())
        })
        .catch(err=>console.log(err))
}

export const markNotificationsRead = (notificationIds) => (dispatch) => {
    axios
      .post('/notification', notificationIds)
      .then((res) => {
        dispatch({
          type: MARK_NOTIFICATIONS_READ
        });
      })
      .catch((err) => console.log(err));
  };

const setAutherizationToken = (token) => {
        const FBIdToken = `Bearer ${token}`;
        localStorage.setItem('FBIdToken',FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
}