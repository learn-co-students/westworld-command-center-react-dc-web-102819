import React from 'react'
import { Segment, Button } from 'semantic-ui-react';
import { Log } from '../services/Log'

class LogPanel extends React.Component {
  state = {
    logs: this.props.logs
  }

  reverseLogs(){
    let logs = [...this.props.logs]
    return logs.reverse()
  }

  buttonStatus(){
    return this.props.coldStorage.length === 0
  }

  render(){
    console.log(this.props.logs)
    return(
      <Segment className="HQComps" id="logPanel">
        <pre>
          {this.reverseLogs().map((log, i) => <p key={i} className={log.type}>{log.msg}</p>)}
        </pre>
        
        <Button
          fluid
          color={ this.buttonStatus() ? "green" : 'red' }
          content={ this.buttonStatus() ? "DECOMISSION ALL" : "ACTIVATE ALL" }
          onClick={ this.props.handleActivateAllHosts }
        />
        
      </Segment>
    )
  }
}

export default LogPanel

//{this.dummyLogs().map((log, i) => <p key={i} className={log.type}>{log.msg}</p>)}