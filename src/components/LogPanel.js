import React from 'react'
import { Segment, Button } from 'semantic-ui-react';
// import { Log } from '../services/Log'
// import { render } from 'react-dom';

const LogPanel = (props) => {
  const {logs, activateAll, hosts, addLog} = props

  let activeBtn = !!hosts.find(host => !host.active)
    return(
      <Segment className="HQComps" id="logPanel">
        <pre>
          {logs.map((log, i) => <p key={i} className={log.type}>{log.msg}</p>)}
        </pre>
        
        <Button
          fluid
          color={activeBtn ? "red" : "green"}
          content={activeBtn ? "ACTIVATE ALL" : "Decommission All"}
          onClick={() => {
            activateAll(activeBtn)
            activeBtn ? addLog('Activated all Hosts', 'warn') : addLog('Decomissioned all Hosts', 'notify') 
            }
          }
        />
      </Segment>
    )
}

export default LogPanel