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

//Redux Stuff
import {connect} from 'react-redux'
import { signupUser } from '../redux/actions/userAuction'
//connect is used to connect redux and react

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
        position:'relative'
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

class signup extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            confirmPassword:'',
            handle:'',
           // loading:false,
            errors:{},
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
        const newUserData={
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword,
            handle:this.state.handle
        }
        //console.log(this.props.history)
        this.props.signupUser(newUserData,this.props.history)

    }
    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    
    render() {
        const {classes,UI:{loading}}=this.props
        const {errors}=this.state
        return (
           
        <Grid container className={classes.form}>
           <Grid item sm/>
          
           <Grid item sm>
           <Paper variant="outlined" className={classes.paper}>
                <img src={logIcon} alt="signup" className={classes.icon}/>
                <Typography variant="h3" className={classes.title}>
                    signup    
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
                        <TextField id="outlined-basic" 
                        label="Outlined"
                        variant="outlined"
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        label="confirmPassword"
                        className={classes.textfield}
                        value={this.state.confirmPassword} 
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true :false}
                        onChange={this.handleChange} 
                        fullWidth
                        
                        />
                        <TextField id="outlined-basic" 
                        label="Outlined"
                        variant="outlined"
                        id="handle" 
                        name="handle" 
                        type="text" 
                        label="Handle"
                        className={classes.textfield}
                        value={this.state.handle} 
                        helperText={errors.handle}
                        error={errors.handle ? true :false}
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
                        signup
                       
                    </Button>

                   

                    <br/><br/>
                    <small>Already have an account ? login <Link to="/login">here</Link></small>
                </form> 
                </Paper>
            </Grid>
            
            <Grid item sm/>
        </Grid>
        
        )
    }
}

signup.protoTypes={
    classes:ProtoTypes.object.isRequired,
    UI:ProtoTypes.object.isRequired,
    user: ProtoTypes.object.isRequired,
    signupUser: ProtoTypes.func.isRequired,
    //signUpWithGoogle : ProtoTypes.func.isRequired
}

const mapStateToProps = ( state ) =>({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps,{signupUser})(withStyles(styles)(signup))