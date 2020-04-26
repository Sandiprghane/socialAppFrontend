import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'
import AuthRoute from './util/AuthRoute'

//redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types' 
import { logoutUser,getUserData } from './redux/actions/userAuction'
//Provider object is used to provides store to web app

//material Ui
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

//components
import Navbar from './components/layout/Navbar';
//pages
import login from './pages/login'
import signup from './pages/signup'
import home from './pages/home'
import user from './pages/user'

import axios from 'axios';


const theme=createMuiTheme(themeFile);

const token=localStorage.FBIdToken;
if(token){
  const decodedToken=jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser)
    window.location.href='/login';
  }
  else{
    //authenticated=true;
    store.dispatch( { type:SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization']=token
    store.dispatch(getUserData())
  }
}

class App extends Component{
  render(){
  return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
          <Navbar/>
              <div className="container">
                    <Switch>
                      <Route exact path="/" component={home}/>
                      <AuthRoute 
                        exact 
                        path="/login" 
                        component={login} 
                      />
                      <AuthRoute 
                        exact 
                        path="/signup" 
                        component={signup} 
                      />
                      <Route exact path="/users/:handle" component={user} />
                    </Switch>
              </div>
            </Router>
        </Provider>
      </MuiThemeProvider>
  );
  }
}

export default App;
