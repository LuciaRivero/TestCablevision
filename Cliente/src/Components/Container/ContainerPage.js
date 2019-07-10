import React, { Component} from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import NameCity from './NameCity';
import NextDaysClimate from './NextDaysClimate';
import SuggestedCities from './SuggestedCities';

class ContainerPage extends Component {

  state = {
    city: '',
    lat: '',
    lon:''
  }

  componentDidMount() {
    let accessKey = '57458027c3f448b0c18fd15bbe8bc2fd';
    fetch(`http://api.ipapi.com/api/check?access_key=${accessKey}`)
    .then(response => response.json())
    .then(parsed => {
      const { ip } = parsed

      return fetch(`http://localhost:5000/location?ip=${ip}`)
    })
    .then(response => response.json())
    .then(location => {
      this.setState({
        city: location.city != null ? location.city : location.capital,
        lat: location.latitude,
        lon:location.longitude
      })})
  }

  updateComponent = (lat, lon, city) => (e) => {
    e.preventDefault()
    this.setState({
      city: city,
      lat: lat,
      lon:lon
    })
  }

render() { 
  return ( 
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" style={{ backgroundColor: '#cfe8fc', height: '500vh' }}>
        <NameCity
          City={this.state.city}
          Lat={this.state.lat}
          Lon={this.state.lon}/>
        <NextDaysClimate
          Lat={this.state.lat}
          Lon={this.state.lon}
          City={this.state.city}/>
        <SuggestedCities
          updateComponent={this.updateComponent}
          Lat={this.state.lat}
          Lon={this.state.lon}/>
      </Container>
  </React.Fragment>
   );
}}

export default ContainerPage;