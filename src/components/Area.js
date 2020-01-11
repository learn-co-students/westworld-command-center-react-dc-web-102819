import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList'

const Area = (props) => {
  Area.propTypes.hosts(props)
  
  return (
  <div className='area' id={props.area.name}>
    <h3 className='labels'>{ props.area.name.split("_").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')}</h3>
    < HostList hosts={props.hosts.filter(host => host.active)}
    changeSelection={props.changeSelection}
    selected={props.selected}
    />

  </div>

)}

Area.propTypes = {
  hosts: function(props, propName, componentName){
    if(props.hosts.length > props.area.limit){
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      )
    }
  }
}

export default Area;
