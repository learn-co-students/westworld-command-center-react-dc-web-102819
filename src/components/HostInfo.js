import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'


class HostInfo extends Component {
  state = {
    options: [
      {key: "badlands", text: "Badlands", value: "badlands"},
      {key: "high_plains", text: "High Plains", value: "high_plains"},
      {key: "lowlands", text: "Lowlands", value: "lowlands"},
      {key: "pariah", text: "Pariah", value: "pariah"},
      {key: "python_pass", text: "Python Pass", value: "python_pass"},
      {key: "under_construction", text: "Under Construction", value: "under_construction"},
    ]
  }


  handleChange = (e, {value}) => {
    this.props.updateHostLocation(value)
  }

  toggle = () => {
    this.props.toggleSelectedHostStatus()
  }

  render(){
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={ this.props.host.imageUrl }
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                { this.props.host.firstName } | { this.props.host.gender.toLowerCase() === "male" ? <Icon name='man' /> : <Icon name='woman' />}
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={ this.toggle }
                  label={ this.props.host.active ? "Active" : "Decommissioned" } 
                  checked={ this.props.host.active ? true : false }
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChange}
                value={this.props.host.area}
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
