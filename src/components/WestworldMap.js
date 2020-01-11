import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'


const WestworldMap = (props) => {

  const {areas, hosts, selected} = props.appState

  return (
    <Segment id="map" >
      {areas.map(area => 
        <Area area={area} 
          key={area.id} 
          hosts={hosts.filter(host => host.area === area.name)}
          changeSelection={props.changeSelection}
          selected={selected}
        />)}
    </Segment>
  )
}

export default WestworldMap
