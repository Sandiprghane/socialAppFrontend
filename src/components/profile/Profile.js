import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import EditDetails from './EditDetails'


//Redux stuff
import { connect } from 'react-redux'
import { logoutUser ,uploadImage} from '../../redux/actions/userAuction'


//MUI Stuff
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

//Icons 
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'


const styles =(theme)=>({
  
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 150,
          height: 150,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00bcd4'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        },

      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
        //padding:'10'
      },
      paper:{
          padding:20
      }
});

class Profile extends Component {
    handleImageChange = (event) =>{
        const image = event.target.files[0]
        const formData = new FormData()
        formData.append('image',image,image.name)
        this.props.uploadImage(formData)
    };
    handleEditPicture = () =>{
        const fileInput=document.getElementById('imageInput')
        fileInput.click();
    }
    handleLogOut = () =>{
        this.props.logoutUser()
    }
    render() {
        const { 
        classes , 
        user:
            { 
                credentials :{ 
                    handle, 
                    createdAt, 
                    imgUrl, 
                    Bio, 
                    webside , 
                    location 
                },
                    loading,
                    authenticated
            }
        }=this.props

        let profileMarkup = !loading ? (authenticated ? (
            <Paper ClassName={classes.card}>
                
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={ imgUrl } alt="profile"className="profile-image"/>
                        <input 
                            type="file" 
                            id="imageInput" 
                            onChange={this.handleImageChange}
                            hidden="hidden"
                        />
                        <Tooltip title="Edit Profile Picture" placement="top">
                        <IconButton onClick={this.handleEditPicture} className="button">
                            <EditIcon color="primary"/>
                        </IconButton>
                        </Tooltip>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={ Link } to={`/users/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr/>
                        { Bio && <Typography variant="body2">{Bio}</Typography>}
                        <hr/>
                        { location && (
                            <Fragment>
                            <LocationOn color="primary"/> <span>{location}</span>
                            <hr/>
                            </Fragment>      
                        )}
                        {webside && (
                            <Fragment>
                                <LinkIcon color="promary"/>
                                <a href={webside} targer="_blank" rel="noopener noreferrer">
                                    {' '}{webside}
                                </a>
                                <hr/>
                            </Fragment>
                        )}
                        <CalendarToday color="primary"/>{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                    <Tooltip title="LogOut" placement="top">
                        <IconButton onClick={this.handleLogOut}>
                            <KeyboardReturn color="primary"/>
                        </IconButton>
                    </Tooltip>
                      <EditDetails/>
                </div>
              
            </Paper>
        ) : (

            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No Profile found, Please login again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">
                        SignUp
                    </Button>
                </div>
            </Paper>
        )): (<p>...loading</p>)
        
        return profileMarkup;
    }
}

const mapStateToProps = (state) =>({
    user: state.user
})

const mapActionToProps ={
    logoutUser,
    uploadImage
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(Profile))
