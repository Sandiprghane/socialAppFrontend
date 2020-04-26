import React, { Component ,Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'

//MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles =(theme) =>({
    commentImage:{
        maxWidth:'100%',
        height:70,
        objectFit:'cover',
        borderRadius:'50%'
    },
    commentData:{
        marginLeft:40
    },
    datec:{
        color:'red'
    }
})
class Comments extends Component {
    render() {
        const {comments,classes} =this.props;
        return (
           <Grid container>
               {comments.map((comment,index)=>{
                   const {body,createdAt,userImage,userHandle}=comment
                   return (
                       <Fragment key={createdAt}>
                           <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src={userImage} className={classes.commentImage}/>
                                    </Grid>
                                    <Grid item sm={9}>
                                      <div className={classes.commentData}>
                                          <Typography
                                            variant="h7"
                                            component={Link}
                                            to={`/users/${userHandle}`}
                                            color="primary">
                                                {userHandle}
                                            </Typography>
                                            <Typography variant="body2" className={classes.datec}>
                                                {dayjs(createdAt).format('h:mm a,MMMM DD YYYY')}
                                            </Typography>
                                            
                                            <Typography variant="body1">{body}</Typography>
                                            
                                      </div>
                                    </Grid>
                                  
                                </Grid>
                                {index !== comments.length-1 && (
                                    <hr className={classes.invisibleSeparator}/>
                                )}
                              
                           </Grid>
                           
                       </Fragment>
                   )
               })}
           </Grid>
        )
    }
}

Comments.propsTypes={
    Comments : PropTypes.array.isRequired
}

export default withStyles(styles)(Comments)
