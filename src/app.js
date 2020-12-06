const express = require("express")
const app = express()
const hbs = require("hbs")
const path = require("path")



//require gettemp and geocode from local modules

const geocode = require('./utils/geocode')
const gettemp = require('./utils/gettemp')

// Define paths for express configs

const viewsDirectory = path.join(__dirname, '../views')
const publicDirectory = path.join(__dirname, "../public")

// Registering Partials

const partialsPath = path.join(__dirname, '../views/partials');



//Define hbs engine and view location and register partials

app.set('view engine', 'hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialsPath)


//Setup static directory to serve

app.use(express.static(publicDirectory));

// setting port for Heroku

const port = process.env.PORT || 3000




app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        message: "hello"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            "error": "You must provide address"
        })
    }


    geocode(req.query.address, (err, data) => {

        if (err) {
            console.log(err)
            return res.send({ err })
        }


        const data1 = JSON.stringify(data);

        const data2 = JSON.parse(data1)

        const { latitude, longitude, location } = data2


        gettemp(latitude, longitude, (err, data) => {

            if (err) return res.send({ error })


            res.send({
                location,
                latitude,
                longitude,
                'temperature': `${data.main.temp}*C`
            })

        })
    }
    )



})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        about: 'Aravind Web Dev'
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        describe: 'how can i help you'
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Visit help page above',
        err: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        err: "Page not found"
    })
})

app.listen(port, () => console.log(`Weather app  running good at port  ${port}`))