import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class NameCity extends Component {
  state = {
    city: {
      main:{
        temp:0
      },
      weather: [
        {
          icon: ""
        }
      ]
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.City !== prevProps.City) {
      fetch(`http://localhost:5000/current/${this.props.City}`)
    .then(response => response.json())
    .then(city => {
      this.setState({
        city
      })
    });
    }
  }

  render() {
    let currentCity = this.state.city;
    const kelvin = 273.15;
    const urlIcon = `http://openweathermap.org/img/w/${currentCity.weather[0].icon}.png`;
    return (
      <div>
        <Paper style={{padding: 10, maxWidth: '100%', textAlign:'center'}}>
          <Typography variant="h5" component="h3">
            {this.props.City}
          </Typography>
          <Typography>{(currentCity.main.temp - kelvin).toFixed(1)}&deg;C</Typography>
          <img src={urlIcon}/>
        </Paper>
      </div>
    )}
  }
  
export default NameCity;
