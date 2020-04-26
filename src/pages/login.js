import React, { Component } from 'react'
import logIcon from '../images/no-img.jpg'
import ProtoTypes from 'prop-types'
import {Link} from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

//Reduc stuf
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userAuction'

const styles={
    form:{
        textAlign:'center'
    },
    icon:{
        height:50,
        width:50,
        borderRadius:50,
        margin:'20px auto 20px auto'
    },
    title:{
        margin:'auto auto 20px auto'
    },
    textfield:{
        margin:'10px auto 10px auto'
    },
    button:{
        marginTop:20, 
        position:'relative',
        //paddingRight:10
       // padding:'auto 0px 0px 5px',
    },
    progress:{
        position:'absolute',
       // marginRight:10
       // marginLeft:10
    },
    customError:{
        color:'red',
        fontSize:'0.8rem',
        marginTop:10
    },
    paper:{
        padding:'5px 45px 5px 45px',
    }
}

class login extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            errors:{},
            //showPassword: false,
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors })
        }
       
    }
    handleSubmit=(event)=>{
        //console.log('clicked')
        event.preventDefault();
        const userData={
            email:this.state.email,
            password:this.state.password
        };
        this.props.loginUser(userData,this.props.history); 
    }
    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    
    render() {
        const {classes, UI:{ loading }}=this.props
        const {errors}=this.state
        return (
           
        <Grid container className={classes.form}>
           <Grid item sm/>
          
           <Grid item sm>
           <Paper variant="outlined" className={classes.paper}>
                <img src={logIcon} alt="login" className={classes.icon}/>
                <Typography variant="h3" className={classes.title}>
                    Login    
                </Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField
                        id="outlined-basic" 
                        label="Outlined"
                        variant="outlined" 
                        id="email" 
                        name="email" 
                        type="email" 
                        label="Email"
                        className={classes.textfield}
                        value={this.state.email} 
                        helperText={errors.email}
                        error={errors.email ? true :false}
                        onChange={this.handleChange} 
                        fullWidth/>
                    <TextField id="outlined-basic" 
                        label="Outlined"
                        variant="outlined"
                        id="password" 
                        name="password" 
                        type="password" 
                        label="Password"
                        className={classes.textfield}
                        value={this.state.password} 
                        helperText={errors.password}
                        error={errors.password ? true :false}
                        onChange={this.handleChange} 
                        fullWidth
                        
                        />

                        {   errors.error && (
                                <Typography variant="body2" className={classes.customError}>
                                    {errors.error}
                                </Typography>
                        )}

                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        disabled={loading}
                        >
                        {loading && (
                            <CircularProgress className="classes.progress" size={25}/>
                        )}
                        login
                       
                    </Button>
                    <br/><br/>
                    <small>don`t have an account ? sign up <Link to="/signup">here</Link></small>
                </form> 
                </Paper>
            </Grid>
            
            <Grid item sm/>
        </Grid>
        
        )
    }
}

login.protoTypes={
    classes:ProtoTypes.object.isRequired,
    loginUser:ProtoTypes.func.isRequired,
    user:ProtoTypes.object.isRequired,
    UI:ProtoTypes.object.isRequired
}
const mapStateToProps = (state) =>({
    user:state.user,
    UI:state.UI
})

const mapActionToProps = {
     loginUser
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(login))