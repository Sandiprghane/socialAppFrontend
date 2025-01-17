import { 
    SET_SCREAMS,
    LOADING_DATA, 
    LIKE_SCREAM, 
    UNLIKE_SCREAM,
    DELETE_SCREAM, 
    CLEAR_ERRORS,
    POST_SCREAM,
    LOADING_UI,
    SET_ERRORS,
    STOP_LOADING_UI,
    SET_SCREAM,
    SUBMIT_COMMENT,
  } from '../types'
import axios from 'axios'


//get all screams
export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/screams')
      .then(res => {
        dispatch({
          type: SET_SCREAMS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: SET_SCREAMS,
          payload: []
        })
      })
  };

//create like scream
export const likeScream =( screamId ) => dispatch=>{
   // console.log(screamId)
    axios.get(`/createScream/${screamId}/like`)
        .then(res=>{
          console.log('like data',res.data);
            dispatch({
                type:LIKE_SCREAM,
                payload:res.data //screamid
            })
            
        })
        .catch(err=>console.log(err))
}

//unlike scream
export const unlikeScream =( screamId ) => dispatch=>{
    axios.get(`/createScream/${screamId}/unlike`)
        .then(res=>{
            dispatch({
                type:UNLIKE_SCREAM,
                payload:res.data
            })
            console.log(res.data)
        })
        .catch(err=>console.log(err))
}


//submit comment
export const submitComment =(screamId,commentData) =>(dispatch)=>{
      console.log('scream Id:',screamId);
      console.log('scream Id:',commentData);
      axios.post(`/createScream/${screamId}/comment`,commentData)
        .then(res=>{
          dispatch({
            type:'SUBMIT_COMMENT',
            payload:res.data
          });
          dispatch(clearErrors())
      })
      .catch((err)=>{
        dispatch({
          type:SET_ERRORS,
          payload:err.response.data
        })
      })

} 

export const deleteScream =(screamId) =>(dispatch) =>{
  axios.delete(`/createScream/${screamId}`)
    .then(()=>{
      dispatch({
        type:DELETE_SCREAM,
        payload:screamId
      })
    })
    .catch(err=>console.log(err))
}


export const postScream = (newScream) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/createScream', newScream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data
      });
      dispatch(clearErrors());
    
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};



export const getScream = (screamId) =>dispatch =>{
    dispatch({type:LOADING_UI})
    axios.get(`/createScream/${screamId}`)
      .then(res=>{
        dispatch({
          type:SET_SCREAM,
          payload:res.data
        });
        dispatch({type:STOP_LOADING_UI})
      })
      .catch(err=>console.log(err))
}
export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.screams
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: null
      });
    });
};
export const clearErrors =()=>(dispatch) =>{
  dispatch({type:CLEAR_ERRORS})
}

