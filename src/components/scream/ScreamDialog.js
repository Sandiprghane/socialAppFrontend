import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import { Link } from 'react-router-dom'
import Comments from './Comments'
import CommentForm from './CommentForm'

//Material Ui

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

//Icon
import CloseIcon from '@material-ui/icons/Close'
import UnfolMore from '@material-ui/icons/UnfoldMore'
import ChatIcon from '@material-ui/icons/Chat'


//Redux
import {connect } from 'react-redux'
import {getScream} from '../../redux/actions/dataAuction'
import LikeButton from './LikeButton'

const styles= ({
    
    invisibleSeprator:{
        border:'none',
        margin:4
    },
    profileImage:{
        width:150,
        height:150,
        borderRadius:'50%',
        objectFit:'cover'
    },
    dialogContent:{
        padding:20
    },
    closeButton:{
        position:'absolute',
        left:'89%'
    },
    expandButton:{
        position:'absolute',
        left:'90%'
    },
    spinner:{
        textAlign:'center',
        marginTop:40,
        marginBottom:40
    },
    visibleSeprator:{
        width:'100%',
        borderBottom:'1px solid rgba(0,0,0,0.1)',
        marginBottom:20
    }
  
})

class ScreamDialog extends Component{
    state={
            open:false
        }
    handleOpen = ()=>{
        this.setState({open:true})
        this.props.getScream(this.props.screamId)
    }
    handleClose = () =>{
        this.setState({open:false})
    }
    render(){
        const {classes,scream:{
            screamId,
            body,
            createdAt,
            likeCount,
            commentCount,
            userImage,
            userHandle,
            comments
        },
        UI:{loading}
    }=this.props

    const dialogMarkup = loading ? (
       <div className={classes.spinner} >
            <CircularProgress size={150} thickness={2}/>
       </div>
    ) : (
        <Grid container spacing ={16}>
            <Grid item sm={5}>
                <img src={userImage} alt="Profile" className={classes.profileImage}/>
            </Grid>
            <Grid item sm={7}>
                <Typography
                   component={Link}
                   color="primary"
                   varaint="h5"
                   to={`/users/${userHandle}`}
                >
                    @{userHandle}
                </Typography>
                <hr className={classes.invisibleSeprator}/>
                <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                </Typography>
                <hr className={classes.invisibleSeprator}/>
                <Typography variant="body1" color="textSecondary">
                    {body}
                </Typography>
                <LikeButton screamId={screamId}/>
                <span>{likeCount} Likes</span>
                <MyButton tip="comments">
                    <ChatIcon color="primary"/>
                </MyButton>
                    <span>{commentCount} Comments</span>
            </Grid>
            <hr className={classes.visibleSeprator}/>
            <CommentForm screamId={screamId}/>
            <Comments comments={comments}/>

        </Grid>
    )
        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Exapand Scream" tipClassName={classes.expandButton}>
                    <UnfolMore color="primary"/>
                </MyButton>
                <Dialog 
                    open={this.state.open}
                    onClose={this.handleClose}
                    maxWidth="xs"
                    fullWidth
                >
                   <MyButton tip="Close" 
                       onClick={this.handleClose} 
                       tipClassName={classes.closeButton}
                       color="secondary"
                   >
                       <CloseIcon/>
                   </MyButton>
                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>

                </Dialog>
            </Fragment>
        )
    }
}

ScreamDialog.proptype={
    getScream : PropTypes.func.isRequired,
    screamId : PropTypes.string.isRequired,
    userHandle : PropTypes.string.isRequired,
    scream : PropTypes.object.isRequired,
    UI : PropTypes.object.isRequired 
}
const mapStateToProps = state =>({
    scream:state.data.scream,
    UI : state.UI
})

const mapActionToProps ={
    getScream
};

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(ScreamDialog))