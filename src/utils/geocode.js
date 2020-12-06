

const axios = require("axios")


const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYXJhdmluZHJvY2t6cyIsImEiOiJja2h0eHgxaW00b3BwMnRsNmxxeXV0NmtuIn0.MSIjBy1fRCHdbSqenevI9w&limit=1`


    axios.get(url)
        .then(function (response) {
            if (response.data.features.length === 0) {
                callback("Unable to find location, please enter another location", undefined)
            }
            else {

                callback(undefined, {
                    latitude: response.data.features[0].center[1],
                    longitude: response.data.features[0].center[0],
                    location: response.data.features[0].place_name
                })
            }

        }).catch(function (error) {
            callback(error, undefined)

        })


}

module.exports = geocode;