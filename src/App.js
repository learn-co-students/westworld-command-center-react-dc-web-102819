import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap.js'
import Headquarters from './components/Headquarters.js'


class App extends Component {
  state = {
    areas: [],
    allHosts: [],
    activeHosts: []
  }

  // As you go through the components given you'll see a lot of functional components.
  // But feel free to change them to whatever you want.
  // It's up to you whether they should be stateful or not.

  componentDidMount(){
    fetch('http://localhost:4000/areas')
      .then(res => res.json())
      .then(areas => this.setState({ areas: areas }))

    fetch('http://localhost:4000/hosts')
      .then(res => res.json())
      .then(hosts => this.setState({ allHosts: hosts }))
  }

  render(){
    return (
      <Segment id='app'>
        <WestworldMap areas={ this.state.areas }  activeHosts={ this.state.activeHosts }/>
        <Headquarters allHosts={ this.state.allHosts }/>
      </Segment>
    )
  }
}

export default App;
