import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

class Host extends React.Component {

	handleOnClick = () => {
		this.props.setSelectedHost(this.props.details)
	}
	
	render(){
		console.log('Inside Host', this.props)
	  return(
	    <Card
	      className={ this.props.isActive ? "host selected" : "host" }
	      onClick={ this.handleOnClick }
	      image={ this.props.details.imageUrl }
	      raised
	    />
	  )
	}
}

export default Host
