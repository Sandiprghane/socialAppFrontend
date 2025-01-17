import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import LikeButton from './LikeButton'


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import { Link }  from  'react-router-dom'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'

//Icons
import ChatIcon from '@material-ui/icons/Chat'
//Reduc Stuff
import { connect } from 'react-redux'


const styles={
    card:{
        position:'relative',
        display:'flex',
        marginBottom:20,
        height:180

    },
    image:{
        minWidth:200,
        minHeight:278
    },
    content:{
        padding:25,
        objectFit:'cover'
    },
    cmd:{
        color:'red'
    }
}


class Scream extends Component {

  

    render(){
        dayjs.extend(relativeTime)    
        const {classes,scream:{
            body,
            createdAt,
            userImage,
            userHandle,
            screamId,
            likeCount,
            commentCount
        },
        user:{
            authenticated ,credentials :{handle}
        }
    }=this.props
        
        const deleteButton = authenticated && userHandle === handle ?(
            <DeleteScream screamId={ screamId }/>
        ):null

        return (
           <Card className={classes.card}>
               <CardMedia
                    image={userImage}
                    title="profile Image"
                    className={classes.image}
               />
               <CardContent className={classes.content}>
                    <Typography variant="h5" 
                        component={Link} to={`/users/${userHandle}`    
                    }
                    color="primary"
                    >
                        {userHandle}
                        </Typography>
                        {deleteButton}
                <Typography variant="body2" coloe="textSecondary">
                    { dayjs(createdAt).fromNow() }
                </Typography>
                <Typography variant="body1">{body}</Typography>
                <LikeButton screamId={screamId}/>
                    <span className={classes.cmd}>
                        {likeCount} Likes
                    </span>
                    <MyButton tip="comment">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span className={classes.cmd}>
                        {commentCount} Comments
                    </span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle}/>
                </CardContent>
            </Card>
          
        )
    }
}
Scream.propTypes = { 
    user:PropTypes.object.isRequired,
    scream:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
}
const mapStateToProps = state =>({
    user:state.user
})




export default connect(mapStateToProps)(withStyles(styles)(Scream))
