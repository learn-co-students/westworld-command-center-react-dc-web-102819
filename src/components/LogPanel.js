import React from 'react'
import { Segment, Button } from 'semantic-ui-react';
import { Log } from '../services/Log'
// import { render } from 'react-dom';

class LogPanel extends React.Component {
  logs = () => {    
    return this.props.logs.map(log => Log[log.type](log.msg))
  }
  
  render() {
    let activeBtn = !!this.props.hosts.find(host => !host.active)
    return(
      <Segment className="HQComps" id="logPanel">
        <pre>
          {this.logs().map((log, i) => <p key={i} className={log.type}>{log.msg}</p>)}
        </pre>
        
        <Button
          fluid
          color={activeBtn ? "red" : "green"}
          content={activeBtn ? "ACTIVATE ALL" : "Decommission All"}
          onClick={
            () => {
              this.props.activateAll(activeBtn)
            }
          }
        />
      </Segment>
    )
  }
}

export default LogPanel