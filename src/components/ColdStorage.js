import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import HostList from './HostList'

class ColdStorage extends Component {
	render(){
		return (
		  <Segment.Group className="HQComps">
		    <Segment compact>
		      <h3 className="labels">ColdStorage</h3>
		    </Segment>
		    <Segment compact>
		    	<HostList 
		    		hosts={ this.props.hosts }
		    		selectedHost={ this.props.selectedHost }
		    		setSelectedHost={ this.props.setSelectedHost }
				/>
		    </Segment>
		  </Segment.Group>
		)	
	}
}


export default ColdStorage
