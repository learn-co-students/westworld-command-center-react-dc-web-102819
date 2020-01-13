import React, {Component} from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host'


class HostList extends Component {
	render(){
	  return(
	    <Card.Group itemsPerRow={6} >
		    { this.props.hosts.map((host, index) => 
		      	<Host 
		      		key={index}
		      		details={host}
	      		/>
	  		)}
	    </Card.Group>
	  )
	}
}

export default HostList