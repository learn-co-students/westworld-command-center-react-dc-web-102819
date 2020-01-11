import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = (props) => {
  return(
    <Card
      className={props.selected === props.host ? 'host selected' : 'host'}
      onClick={(e) => props.changeSelection(e, props.host)}
      image={props.host.imageUrl}
      raised
    />
  )
}

export default Host