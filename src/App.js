import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap.js'
import Headquarters from './components/Headquarters.js'


class App extends Component {
  state = {
    areas: [],
    hosts: [],
    selectedHost: null,
    logs: [],
    status: null,
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
      .then(hosts => this.setState({ hosts: hosts }))
  }

  setSelectedHost = (host) => {
    if (this.state.selectedHost === host) {
      this.setState({ selectedHost: null })
    } else {
      this.setState({ selectedHost: host })
    }
  }

  toggleSelectedHostStatus = () => {
    const selectedHost = this.state.selectedHost
    selectedHost.active = !this.state.selectedHost.active

    const hostConfig = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(selectedHost)
    }

    fetch(`http://localhost:4000/hosts/${selectedHost.id}`, hostConfig)
      .then(res => res.json())
      .then(updatedHost => this.setState({
        selectedHost: updatedHost,
        hosts: [...this.state.hosts.filter(host => host.id !== updatedHost.id), updatedHost],
        status: null,
      }))
  }

  updateHostLocation = (value) => {
    const selectedHost = this.state.selectedHost
    selectedHost.area = value

    const hostConfig = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(selectedHost)
    }

    fetch(`http://localhost:4000/hosts/${selectedHost.id}`, hostConfig)
      .then(res => res.json())
      .then(updatedHost => this.setState({
        selectedHost: updatedHost,
        hosts: [...this.state.hosts.filter(host => host.id !== updatedHost.id), updatedHost],
      }))
  }

  filterActiveHosts = () => {
    return this.state.hosts.filter(host => host.active).sort((a,b) => (a.id > b.id) ? 1 : -1 )
  }

  filterInactiveHosts = () => {
    return this.state.hosts.filter(host => !host.active).sort((a,b) => (a.id > b.id) ? 1 : -1 )
  }

  handleActivateAllHosts = () => {
    console.log("activate all")
    debugger
    const updatedHosts = [...this.state.hosts]
    if (this.state.status === null || this.state.status === "inactive") {
      updatedHosts.forEach(host => host.active = true)
      this.setState({
        hosts: updatedHosts,
        status: "active"
      })
    } else if (this.state.status === 'active') {
      updatedHosts.forEach(host => host.active = false)
      this.setState({
        hosts: updatedHosts,
        status: "inactive"
      })
    }
  }

  render(){
    return (
      <Segment id='app'>
        <WestworldMap
          areas={ this.state.areas }
          activeHosts={ this.filterActiveHosts() }
          selectedHost={ this.state.selectedHost }
          setSelectedHost={ this.setSelectedHost }
        />
        <Headquarters
          hosts={ this.filterInactiveHosts() }
          selectedHost={ this.state.selectedHost }
          setSelectedHost={ this.setSelectedHost }
          toggleSelectedHostStatus={ this.toggleSelectedHostStatus }
          updateHostLocation={ this.updateHostLocation }
          logs={ this.state.logs }
          status={ this.state.status }
          handleActivateAllHosts={ this.handleActivateAllHosts }
        />
      </Segment>
    )
  }
}

export default App;
