import React, { Component } from 'react'
import {Route,Redirect} from 'react-router-dom'
import ProtoTypes from 'prop-types'
//Redux Stuff
import { connect } from 'react-redux'


 const AuthRoute =({component:Component,authenticated,...rest})=>(
    <Route
        {...rest}
        render={(props)=>
            authenticated===true ? <Redirect to="/"/>:<Component{...props}/>
        }
    />
 );
const mapStateToProps =(state) =>({
    authenticated:state.user.authenticated
})

AuthRoute.protoTypes={
    user:ProtoTypes.object.isRequired
};


 export default connect(mapStateToProps)(AuthRoute)
