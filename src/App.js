import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import Map from './components/WestworldMap'
import HQ from './components/Headquarters'

const urls = { 'hosts': 'http://localhost:4000/hosts', 'areas': 'http://localhost:4000/areas'}


class App extends Component {
  // As you go through the components given you'll see a lot of functional components.
  // But feel free to change them to whatever you want.
  // It's up to you whether they should be stateful or not.

  constructor() {
    super()
    this.state = {areas: [], hosts: [], selected: null}
  }

  changeSelection = (e, host) => {
    this.setState({
      selected: host
    })
  }

  changeHostActiveStatus = (targetHost) => {
    let unchangedHosts = this.state.hosts.filter(host => host!== targetHost)
    targetHost.active = !targetHost.active
    this.setState({
      hosts: [...unchangedHosts, targetHost]
    })
  }

  changeHostArea = (newArea, targetHost) => {
    let unchangedHosts = this.state.hosts.filter(host => host !== targetHost)
    targetHost.area = newArea
    this.setState({
      hosts: [...unchangedHosts, targetHost]
    })
  }

  changeFunctions = {area: this.changeHostArea, selection: this.changeSelection, status: this.changeHostActiveStatus}

  componentDidMount() {
    for (const dataCategory in urls) {
      fetch(urls[dataCategory])
      .then(response => response.json())
      .then(data => this.setState({
        [dataCategory]: data
      }))
    }
  }

  render(){
    return (
      <Segment id='app'>
        {/* What components should go here? Check out Checkpoint 1 of the Readme if you're confused */}
        < Map appState={this.state} changeSelection={this.changeSelection}/>
        < HQ appState={this.state} changeFunctions={this.changeFunctions} />
      </Segment>
    )
  }
}

export default App;
