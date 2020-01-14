import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area.js'


class WestworldMap extends React.Component {
	render(){
	  return (
	    <Segment id="map" >
	      { this.props.areas.map(area => 
	      	<Area 
	      		key={area.name} 
	      		details={ area }
	      		hosts={this.props.activeHosts.filter(host => host.area === area.name)}
	      		selectedHost={ this.props.selectedHost }
	      		setSelectedHost={ this.props.setSelectedHost } 
	  		/> 
		  )}
	    </Segment>
	  )
	}
}

export default WestworldMap
