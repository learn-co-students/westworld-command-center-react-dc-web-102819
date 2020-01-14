import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import * as Images from '../services/Images'
import HostInfo from './HostInfo'


const Details = (props) => {

  const renderSomething = () => (<Image size='medium' src={Images.westworldLogo}/>)

  return(
    <Segment id="details" className="HQComps">
      { props.host === null ? 
      		renderSomething() 
      		: <HostInfo 
      			host={props.host} 
      			toggleSelectedHostStatus={ props.toggleSelectedHostStatus } 
      			updateHostLocation={ props.updateHostLocation }
  			/>
  	  }
    </Segment>
  )
}

export default Details
