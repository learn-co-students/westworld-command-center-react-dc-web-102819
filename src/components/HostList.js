import React from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host'

const HostList = props => {

  const {hosts, changeSelection, selected} = props

  return(
    <Card.Group itemsPerRow={6}>
      {hosts.map(host => < Host host={host} key={host.id} changeSelection={changeSelection} selected={selected}/>)}
    </Card.Group>
  )
}

export default HostList
