import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

class Host extends React.Component {
	state = {
		selected: false
	}
	render(){
		console.log('Inside Host', this.props.details)
	  return(
	    <Card
	      className={ this.state.selected ? "host selected" : "host" }
	      onClick={ () => console.log("host clicked", this.props.details)}
	      image={ this.props.details.imageUrl }
	      raised
	    />
	  )
	}
}

export default Host
