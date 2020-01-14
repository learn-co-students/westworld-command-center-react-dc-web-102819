import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap.js'
import Headquarters from './components/Headquarters.js'
import { Log } from './services/Log'


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
      this.setState({ 
        selectedHost: host
      })
    }
  }

  titleCase(string, split) {
    const input = string.split(split)
    console.log('titlecasing...', string, split, input)
    return input.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
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
        logs: [...this.state.logs, Log.notify(`${updatedHost.firstName} has been ${updatedHost.active ? "Activated" : "Deactivated" }`)]
      }))
  }

  updateHostLocation = (value) => {
    //find the area & limit from the value
    const area = this.state.areas.find(area => area.name === value)
    console.log('area= ', area)
    const areaLimit = area.limit

    //find number of hosts from area
    const areaHosts = this.state.hosts.filter(host => host.area === area.name).length
    console.log('hosts= ', areaHosts)


    if (areaHosts === areaLimit) {
      // console.log(areaHosts, areaLimit, areaHosts > areaLimit+1)
      console.log("DO NOT ADD")
      this.setState({
        logs: [...this.state.logs, Log.error(`HEY!! You got too many hosts in ${this.titleCase(area.name, '_')}. The limit for that area is ${area.limit}. You gotta fix that!`)]
      })
    } else {
      const selectedHost = {...this.state.selectedHost}
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
          logs: [...this.state.logs, Log.notify(`${updatedHost.firstName} has been moved to ${this.titleCase(updatedHost.area,'_')}`)]
        }))
    }

  }

  filterActiveHosts = () => {
    return this.state.hosts.filter(host => host.active).sort((a,b) => (a.id > b.id) ? 1 : -1 )
  }

  filterInactiveHosts = () => {
    return this.state.hosts.filter(host => !host.active).sort((a,b) => (a.id > b.id) ? 1 : -1 )
  }


  // @ TODO this does not persist to the DB
  handleActivateAllHosts = () => {
    console.log("activate all")
    const updatedHosts = [...this.state.hosts]
    let status = this.state.status
    if (this.state.status === null || this.state.status === "inactive") {
      updatedHosts.forEach(host => host.active = true)
      status = "active"
      this.setState({
        hosts: updatedHosts,
        status: "active",
        logs: [...this.state.logs, Log.warn(`All hosts have been activated`)]
      })
    } else if (this.state.status === 'active') {
      updatedHosts.forEach(host => host.active = false)
      status = "inactive"
      this.setState({
        hosts: updatedHosts,
        status: "inactive",
        logs: [...this.state.logs, Log.warn(`All hosts have been deactivated`)]
      })
    }


    // //BELOW IS TO PERSIST DATA TO THE BACK END - IT DOES NOT WORK.
    // const newHosts = []
    // console.log('updatesHosts =', updatedHosts)
    // updatedHosts.forEach(host => {
    //   fetch(`http://localhost:4000/hosts/${host.id}`,{
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "accepts": "application/json"
    //     },
    //     body: JSON.stringify(host)
    //   })
    //     .then(res => res.json())
    //     .then(newData => {
    //       newHosts.push(newData)
    //       // console.log(newHosts, newData)
    //     })
    // })

    // console.log('newHosts = ',newHosts)


    //BELOW IS TO PERSIST DATA TO THE BACK END - IT DOES NOT WORK.
    // console.log("updatedHosts = ", updatedHosts)
    // fetch('http://localhost:4000/hosts', {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "accepts": "application/json"
    //   },
    //   body: JSON.stringify(updatedHosts)
    // })
    //   .then(res=> res.json())
    //   .then(modifiedHosts => {
    //     console.log(modifiedHosts)
        // this.setState({
        //       hosts: modifiedHosts,
        //       status: status,
        //       logs: [...this.state.logs, Log.warn(`All hosts have been ${ status = "active" ? "activated" : "deactivated" }`)]
        //     })
    // })
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
