import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import Map from './components/WestworldMap'
import HQ from './components/Headquarters'

const urls = { 'hosts': 'http://localhost:4000/hosts', 'areas': 'http://localhost:4000/areas'}

class App extends Component {
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
      hosts: [...unchangedHosts, targetHost].sort((a, b) => (a.id > b.id ? 1 : -1))
    })
    
    return targetHost.active
}

  areaAvailable = (area) => {
    return area.limit > this.state.hosts.filter(host => host.area === area.name).length
  }

  changeHostArea = (newArea, targetHost) => {
    if (this.areaAvailable(this.state.areas.find(area => area.name === newArea))) {
      let unchangedHosts = this.state.hosts.filter(host => host !== targetHost)
      targetHost.area = newArea
      this.setState({
        hosts: [...unchangedHosts, targetHost].sort((a, b) => (a.id > b.id ? 1 : -1))
      })
      return true
    } else {
      return false
    }
  }

  activateAll = (boolean) => {
    this.setState((state) => ({
      hosts: state.hosts.map(host => Object.assign(host, {active: boolean}))
      }))
  }

  changeFunctions = {
    area: this.changeHostArea,
    selection: this.changeSelection,
    status: this.changeHostActiveStatus,
    fullActivation: this.activateAll }

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
        < Map appState={this.state} changeSelection={this.changeSelection}/>
        < HQ appState={this.state} changeFunctions={this.changeFunctions} />
      </Segment>
    )
  }
}

export default App;
