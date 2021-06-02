const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicGFua2Fqc2hhcm1hMDkiLCJhIjoiY2twNnJkbWNsMnNzdzJ4bWN3bW5keHNwcSJ9._a5rT-VepsgU46uwLqEj2w&limit=1`;
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to Fetch', undefined)
            return;
        }
        if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
            return;
        }
        const { center = [], place_name = '' } = response.body.features[0];
        const latitude = center[1];
        const longitude = center[0];
        const location = place_name;
        callback(undefined, {latitude, longitude, location})
    })
}

module.exports = geocode;