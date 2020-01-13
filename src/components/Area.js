import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList.js'

const Area = (props) => (

  <div className='area' id={props.details.name}>
    <h3 className='labels'>{props.details.name}</h3>

    {<HostList hosts={props.activeHosts}/>}

  </div>

)

Area.propTypes = {
  hosts: function(props, propName, componentName){
    if(props.activeHosts.length > props.limit){
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      )
    }
  }
}

export default Area;
