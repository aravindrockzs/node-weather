const axios = require('axios');



gettemp = (lat, lon, callback) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=3f47d697d71c3dc90a0e9ba98918c941&units=metric"

    axios.get(url)
        .then(function (response) {

            callback(undefined, response.data)
            // console.log(response.data)


        }).catch(function (err) {
            console.log("my error")
            console.log(err);
        })


}

module.exports = gettemp;