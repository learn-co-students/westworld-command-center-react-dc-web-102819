import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage';
import LogPanel from './LogPanel'
import {Log} from '../services/Log' // moved from LogPanel.js since components are being added from function located here


class Headquarters extends Component {
  state = {logs: []}

  addLog = (message, msgType) => {
    this.setState({logs: [Log[msgType](message), ...this.state.logs]})
  }

  render(){
    const {selected, hosts, areas} = this.props.appState

    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
          <ColdStorage hosts={hosts.filter(host => !host.active)} 
            changeSelection={this.props.changeFunctions.selection} 
            selected={selected}/>
        </Grid.Column>
        <Grid.Column width={5}>
          <Details host={selected} 
            areasList={areas} 
            addLog={this.addLog} 
            changeFunctions={this.props.changeFunctions} />
        </Grid.Column>
        <Grid.Column width={3}>
          <LogPanel logs={this.state.logs} 
            hosts={hosts} 
            addLog={this.addLog} 
            activateAll={this.props.changeFunctions.fullActivation} />
        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
