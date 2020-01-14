import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList.js'

class Area extends React.Component {

  titleCaseArea() {
    const nameArray = this.props.details.name.split('_')
    return nameArray.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  render(){
    return (
      <div className='area' id={ this.props.details.name }>
        <h3 className='labels'>{ this.titleCaseArea() }</h3>

        {
          <HostList 
            hosts={ this.props.hosts }
            selectedHost={ this.props.selectedHost }
            setSelectedHost={ this.props.setSelectedHost }
          />
        }

      </div>
    )
  }
}

export default Area;

  // propTypes = () => {
  //   hosts: function(this.props, propName, componentName){
  //     if(this.props.hosts.length > this.props.limit){
  //       throw Error(
  //         `HEY!! You got too many hosts in ${this.props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
  //       )
  //     }
  //   }
  // }