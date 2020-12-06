
console.log('lock and loaded');

let form = document.querySelector("#getweather");

let p1 = document.querySelector("body > div > p.Location");

let p2 = document.querySelector("body > div > p.forecast");

let locbutton = document.querySelector("#button-location");

let showmap = document.querySelector("#map");

showmap.style.display = "none";

let inputdata = document.querySelector("#getweather > input[type=text]");


callback = ({ coords: { latitude }, coords: { longitude } }) => {

    showmap.style.display = "block";
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXJhdmluZHJvY2t6cyIsImEiOiJja2h0eHgxaW00b3BwMnRsNmxxeXV0NmtuIn0.MSIjBy1fRCHdbSqenevI9w';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 5
    });

    fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=3f47d697d71c3dc90a0e9ba98918c941&units=metric")
        .then(response => response.json())
        .then(data => fetch(`http://localhost:3000/weather?address=${data.name}`))
        .then((response) => response.json())
        .then(data => {
            console.log(data)

            if (data.location === undefined) {
                p2.innerText = '',
                    p1.innerText = data.err
                return
            }

            p1.innerText = data.location;
            p2.innerText = data.temperature;



        }).catch(error => {
            console.log({ err })
            p1.innerText = error.error
        })
}

showError = (error) => {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            p1.innerText = "User denied the request for Geolocation.Give access to geolocation"
            break;
        case error.POSITION_UNAVAILABLE:
            p1.innerText = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            p1.innerText = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            p1.innerText = "An unknown error occurred."
            break;
    }
}




locbutton.addEventListener('click', () => {


    return navigator.geolocation.getCurrentPosition(callback, showError)



})



form.addEventListener('submit', (e) => {
    e.preventDefault()

    p1.innerText = "Loading..."


    const input = inputdata.value;

    fetch(`http://localhost:3000/weather?address=${input}`)
        .then((response) => response.json())
        .then(data => {
            console.log(data)

            if (data.error === 'You must provide address') {
                p1.innerText = 'Please enter a valid location',
                    p2.innerText = ''

                return;
            }

            if (data.err === 'Unable to find location, please enter another location') {
                p1.innerText = data.err,
                    p2.innerText = ''

                return;
            }
            showmap.style.display = "block";

            p1.innerText = data.location;
            p2.innerText = data.temperature;

            mapboxgl.accessToken = 'pk.eyJ1IjoiYXJhdmluZHJvY2t6cyIsImEiOiJja2h0eHgxaW00b3BwMnRsNmxxeXV0NmtuIn0.MSIjBy1fRCHdbSqenevI9w';
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [data.longitude, data.latitude],
                zoom: 11.15
            });

        })




}
)
