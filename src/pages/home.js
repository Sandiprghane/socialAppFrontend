import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
//REdux
import { connect } from 'react-redux'
import { getScreams } from '../redux/actions/dataAuction'

//React components
import Scream from '../components/scream/Scream'
import Profile from '../components/profile/Profile'

class home extends Component {
    componentDidMount(){
        this.props.getScreams()
    }
    render() {
        const { screams, loading } = this.props.data;
        //console.log(screams)
        let recentScreamMArkup = !loading ? (
            screams.map((scream)=>
                <Scream key={scream.screamId} scream={scream}/>
            )
        ):(
            <p>...Loading</p>
        )

        return (
            <Grid container spacing={1}>
            <Grid item sm={2}> 
             </Grid>
            <Grid item sm={6} xs={12}>
                    {recentScreamMArkup}
            </Grid>
            <Grid item sm={3} xs={12}>
                <Profile />
            </Grid>
          </Grid>
      )
    }
}

home.propTypes ={
    getScreams : PropTypes.func.isRequired,
    data:PropTypes.object.isRequired,
}
const mapStateToProps = state =>({
    data:state.data
})
export default connect(mapStateToProps ,{ getScreams })(home)
