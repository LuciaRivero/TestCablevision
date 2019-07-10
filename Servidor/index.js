const express = require('express');
var rp = require('request-promise');
const bodyParser = require('body-parser');
var cors = require('cors')


//crear servidor
const app = express();


app.use(cors())

//server for json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Data 
const access_key = '57458027c3f448b0c18fd15bbe8bc2fd'
const appid = '00a8f4efa38381b42a4de9563ceff7bc'
const IP_BASE_URL = 'http://api.ipapi.com/api/'
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/'
const WEATHER_FORECAST_URI = 'forecast'
const WEATHER_FIND_URI = 'find'

//Devuelvo datos de ubicacion.
app.get('/location', async (req, res) => {
  const { ip } = req.query
  const options = {
    uri: `${IP_BASE_URL}${ip}`,
    qs: {
        access_key
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true
  };
  
  const response = await rp(options)
  const { location, city, latitude, longitude } = response
  let capital = location.capital;
  res.json({ capital, city, latitude, longitude })
});

//(32 °F − 32) × 5/9 = 0 °C
//Devuelve los datos de ubicación segun city y el estado del tiempo actual.
app.get('/current/:city', async (req, res) => {
  const city = req.params.city

  const options = {
    uri: `${WEATHER_BASE_URL}${WEATHER_FORECAST_URI}`,
    qs: {
      q: city,
      appid
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true 
  };
  
  const { list } = await rp(options);
  const { main, weather } = list[0];

  res.json({ main, weather })
})

//Devuelvo el clima actual para 5 cuidades cercanas segun ubicacion actual
app.get('/current/', async (req, res) => {
  const { lat, lon } = req.query 
  const citiesAmount = 5
  const options = {
    uri: `${WEATHER_BASE_URL}${WEATHER_FIND_URI}`,
    qs: {
      lat,
      lon,
      cnt: citiesAmount,
      appid
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true 
  };
  
  const { list } = await rp(options)
  const response = list.map(({ name, coord, main, weather }) => {
    return {
      name,
      coord,
      main,
      weather
    }
  })
  res.json(response)
})

//Devuelvo clima segun ciudad + los proximos 5 dias
app.get('/forecast/:city', async (req, res) => {
  const city = req.params.city
  console.log(city)
  const options = {
    uri: `${WEATHER_BASE_URL}${WEATHER_FORECAST_URI}`,
    qs: {
      q: city,
      appid
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true 
  };
  
  const { list } = await rp(options);

  const response = list
    .map(({ name, coord, main, weather, dt_txt }) => {
      return {
        name,
        coord,
        main,
        weather,
        dt_txt
      }
    })
    .filter(dia => dia.dt_txt.substring(11, 13) === '12')

  res.json(response)

})

//Devuelvo los proximos 5 dias de clima segun ubicacion
app.get('/forecast/', async (req, res) => {
  const { lat, lon } = req.query 
  const options = {
    uri: `${WEATHER_BASE_URL}${WEATHER_FORECAST_URI}`,
    qs: {
      lat,
      lon,
      appid
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true 
  };
  
  const { list } = await rp(options);

  const response = list
    .map(({ name, coord, main, weather, dt_txt }) => {
      return {
        name,
        coord,
        main,
        weather,
        dt_txt
      }
    })
    .filter(dia => dia.dt_txt.substring(11, 13) === '12')

  res.json(response)

})

app.listen(5000, () => {
  console.log('server OK');
})