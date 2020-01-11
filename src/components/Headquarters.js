import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage';


class Headquarters extends Component {
  // Remember, there's many ways to do this. This doesn't have to be a class component. It's up to you.

  render(){

    const {selected, hosts, areas} = this.props.appState
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
          <ColdStorage hosts={hosts.filter(host => !host.active)} changeSelection={this.props.changeFunctions.selection} selected={selected}/>
        </Grid.Column>
        <Grid.Column width={5}>
          <Details host={selected} areasList={areas} changeFunctions={this.props.changeFunctions} />
        </Grid.Column>
        <Grid.Column width={3}>
          Hi Again
        {/* and here. Take visual cues from the screenshot/video in the Readme. */}

        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
