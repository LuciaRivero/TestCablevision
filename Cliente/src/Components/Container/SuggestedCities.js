import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'

class SuggestedCities extends Component {

  state = {
    cities: []
  }
  componentDidUpdate(prevProps) {
    if (this.props.Lat !== prevProps.Lat && this.props.Lon !== prevProps.Lat) {
      fetch(`http://localhost:5000/current?lat=${this.props.Lat}&lon=${this.props.Lon}`)
    .then(response => response.json())
    .then(cities => {
      this.setState({
        cities
      })
    });
    }
  }


  render() { 
    let cities = this.state.cities
    const kelvin = 273.15;

    return (
      <div style={{textAlign:'center'}}>
        <Typography variant="h5" component="h3" style={{margin:10}}> Ciudades Cercanas</Typography>
        { cities.map(city => {
          const urlIcon = `http://openweathermap.org/img/w/${city.weather[0].icon}.png`;
            return (
              <Card onClick={this.props.updateComponent(city.coord.lat, city.coord.lon, city.name)} key={city.name} style={{padding: 10, height: '50vh', width: '25vh', margin:10, textAlign:'center', display:'inline-block'}}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {city.name}
                  </Typography>
                  <p className="temperatura">
                    Actual: {(city.main.temp - kelvin).toFixed(1)} &deg;C            
                  </p>
                  <img src={urlIcon}/>
                  <p>Max. {(city.main.temp_max - kelvin).toFixed(1)}&deg;C</p>
                  <p>Min. {(city.main.temp_min - kelvin).toFixed(1)}&deg;C</p>
                </CardContent>
              </Card>
            );
          })
        }
      </div>
    )
  }
}



export default SuggestedCities;