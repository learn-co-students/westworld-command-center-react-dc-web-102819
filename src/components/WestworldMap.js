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
	      		activeHosts={this.props.activeHosts} 
	  		/> 
		  )}
	    </Segment>
	  )
	}
}

export default WestworldMap
