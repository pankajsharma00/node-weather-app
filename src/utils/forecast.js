const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/76733e9c3ca293ed6de639d3d5bf874f/' + latitude + ',' + longitude + '?units=si'
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect forecast services!', undefined)
        } else if (response.body.error) {
            callback('Unable to find the location.', undefined)
        } else {
            const { daily : { data}, currently: { temperature, precipProbability}} = response.body;
            callback(undefined, data[0].summary + ' It is currently ' + temperature + ' degrees out. There is a ' + precipProbability + '% chance of rain today.')
        }
    })
}

module.exports = forecast