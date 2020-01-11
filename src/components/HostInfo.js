import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'


class HostInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: this.props.areasList.map(function(area) {
        return {key: area.name, text: area.name.split("_").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' '), value: area.name}
      }),
      value: this.props.host.area
    }
  }

  areaNameFormatter(areaName) {
    return areaName.split("_").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
  }

  handleChange = (e, {value}) => {
    if (this.props.changeFunctions.area(value, this.props.host)) {
      this.props.addLog(this.props.host.firstName + " set in area " + this.areaNameFormatter(value), "notify")
    } else {
      this.props.addLog("Too many hosts. Cannot add " + this.props.host.firstName + " to " + this.areaNameFormatter(value), 'error')
    }
    this.setState({value: value})
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
  }

  toggle = () => {
    if (this.props.changeFunctions.status(this.props.host)) {
      this.props.addLog("Activated " + this.props.host.firstName, 'warn')
    } else {
      this.props.addLog("Decomissioned " + this.props.host.firstName, 'notify')
    }
  }

  render(){
    const {host} = this.props
    console.log(host.active)
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={host.imageUrl}
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {host.firstName} | { host.gender === 'Male' ? <Icon name='man' /> : <Icon name='woman' />}
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={this.toggle}
                  label={host.active ? "Active" : "Decommissioned"}
                  checked={host.active} //buggy line
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChange}
                value={host.area}
                options={this.state.options}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default HostInfo
