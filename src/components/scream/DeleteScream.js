import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'


//MUI stuff
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DeletOutLine from '@material-ui/icons/DeleteOutline'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'
import { deleteScream ,clearErrors} from '../../redux/actions/dataAuction'



const styles ={
    deleteButton:{
        position:'absolute',
        left:'90%',
        top:'10%'
    }
}   


class DeleteScream extends Component {
    state={
        open:false
    };
    handleOpen = () =>{
        this.setState({open:true})
}
handleClose = () =>{
    this.props.clearErrors();
    this.setState({open:false})
}
    deleteScream =()=>{
        this.props.deleteScream(this.props.screamId)
        this.setState({ open :false })
    }

       render() {
        const { classes } =this.props
        return (
           <Fragment>
               <MyButton tip="Delete Scream"
                        onClick={this.handleOpen}
                        btnClassName={classes.deleteButton}
                >
                    <DeletOutLine color="secondary"/>    
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    maxWidth="xs"
                    >
                    <DialogTitle>
                        Are u Sure to want Delete this Scream ??   
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancle
                        </Button>
                        <Button onClick={this.deleteScream} color="secondary">
                            Delete
                        </Button>

                    </DialogActions>        
                </Dialog> 
           </Fragment>
        )
    }
}
DeleteScream.propTypes ={
    deleteScream : PropTypes.func.isRequired,
    clearErrors : PropTypes.func.isRequired,
    classes : PropTypes.object.isRequired,
    screamId : PropTypes.string.isRequired
}


export default connect(
        null,
        { deleteScream , clearErrors}
    )(withStyles(styles)(DeleteScream));
