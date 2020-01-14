import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'


class Headquarters extends Component {
  render(){
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>

        <ColdStorage
          hosts={ this.props.hosts }
          selectedHost={ this.props.selectedHost }
          setSelectedHost={ this.props.setSelectedHost }
        />

        </Grid.Column>
        <Grid.Column width={5}>
          <Details
            host={ this.props.selectedHost }
            toggleSelectedHostStatus={ this.props.toggleSelectedHostStatus }
            updateHostLocation={ this.props.updateHostLocation }
          />
        </Grid.Column>
        <Grid.Column width={3}>

        {/* and here. Take visual cues from the screenshot/video in the Readme. */}
        <LogPanel
          coldStorage={ this.props.hosts }
          logs={ this.props.logs }
          status={ this.props.status }
          handleActivateAllHosts={ this.props.handleActivateAllHosts }
        />

        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
