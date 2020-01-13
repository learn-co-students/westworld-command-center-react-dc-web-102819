import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage'
// import LogPanel from './LogPanel'


class Headquarters extends Component {
  state = {
    selectedHost: null
  }

  setSelectedHost = (host) => {
    console.log("Selecting", host)
    this.setState({ selectedHost: host })
  }

  render(){
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>

        {/* Something goes here.... */}
        <ColdStorage
          hosts={ this.props.allHosts }
          selectedHost={ this.state.selectedHost }
          setSelectedHost={ this.setSelectedHost }
        />

        </Grid.Column>
        <Grid.Column width={5}>
          <Details host={ this.state.selectedHost } />
        </Grid.Column>
        <Grid.Column width={3}>

        {/* and here. Take visual cues from the screenshot/video in the Readme. */}
        <div>Log Panel</div>

        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
