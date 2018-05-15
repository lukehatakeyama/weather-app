const yargs = require('yargs');
const axios = require('axios');

var argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address that you want weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

console.log(argv);

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAQQNpKWgXG3aSjikQ2EGWU79C7bHgeZcI`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Cannot find specified address.');
  }
  console.log(response.data);

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var formatted_address = response.data.results[0].formatted_address;
  var weatherURL = `https://api.darksky.net/forecast/73d02a0d2e0ffbbf36b9c851a9f019b8/${lat},${lng}`;
  return axios.get(weatherURL);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It is ${temperature}. It feels like ${apparentTemperature}`);
}).catch((e) => {
  if (e.code === 'ECONNREFUSED') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});
