import React, { Component ,Fragment} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import CreateScream from '../scream/CreateScream'
import Notifications from './Notifications'
//Redux stuff
import { connect } from 'react-redux'

//MUC
import AppBar from '@material-ui/core/Appbar'
import ToolBar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'



class navbar extends Component {

    render() {
        
    const {authenticated} =this.props;

        return (
           <AppBar>
               <ToolBar className="nav-container">
                   { authenticated ? (
                       <Fragment>
                           <CreateScream/>
                       <Link to="/">
                       <MyButton tip="Home">
                            <HomeIcon color="primary"/>
                        </MyButton>
                       </Link>
                            <Notifications/>
                       </Fragment>
                   ) :(
                       <Fragment>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">SignUp</Button>
                        </Fragment>
                   )}
                   
               </ToolBar>
           </AppBar>
        )
    }
}

navbar.propTypes ={
    authenticated:PropTypes.bool.isRequired
}
const mapStateToProps =(state) =>({
    authenticated:state.user.authenticated
})
export default connect(mapStateToProps)(navbar)
