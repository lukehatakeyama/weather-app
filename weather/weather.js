

const request = require('request');

var getWeather = (latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/73d02a0d2e0ffbbf36b9c851a9f019b8/${latitude},${longitude}`,
    json: true,
  }, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      callback(undefined, {
        temperature : body.currently.temperature,
        apparentTemperature : body.currently.apparentTemperature,
      });
    } else {
      callback('Could not fetch weather.');
    }

  });
};

module.exports.getWeather = getWeather;
