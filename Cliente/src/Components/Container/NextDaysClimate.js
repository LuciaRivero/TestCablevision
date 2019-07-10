import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import * as moment from 'moment';

class NextDaysClimate extends Component {

  state = {
    days: []
  }
  componentDidUpdate(prevProps) {
    if (this.props.Lat !== prevProps.Lat && this.props.Lon !== prevProps.Lat) {
      fetch(`http://localhost:5000/forecast?lat=${this.props.Lat}&lon=${this.props.Lon}`)
    .then(response => response.json())
    .then(days => {

      this.setState({
        days
      })
    });
    }
  }
  render() { 
    let days = this.state.days
    const kelvin = 273.15;
    return (
      <div style={{textAlign:'center'}}>
        <Typography variant="h5" component="h3" style={{margin:10}}> Clima en {this.props.City} proximos 5 dias</Typography>
        {days.map(day => {
          const urlIcon = `http://openweathermap.org/img/w/${day.weather[0].icon}.png`;
          
          let now = moment(day.dt_txt).format("ll");
          return (
            <Paper key={day.dt_txt} style={{ width: '20vh', margin:10, textAlign:'center', display:'inline-block'}}>
                <Typography color="textSecondary" gutterBottom>
                    {now}
                  </Typography>
                  <img src={urlIcon}/>
                  <p>Max. {(day.main.temp_max - kelvin).toFixed(1)}&deg;C</p>
                  <p>Min. {(day.main.temp_min - kelvin).toFixed(1)}&deg;C</p>
            </Paper>
          )
        })}
      </div>
    )}
  }



export default NextDaysClimate;