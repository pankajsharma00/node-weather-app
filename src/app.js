const express = require('express');
const path = require('path');
const hbs = require('hbs')

const app = express();

const port = process.env.PORT || 3000

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewLocationPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebar engine and view location
app.set('view engine', 'hbs');
app.set('views', viewLocationPath)
hbs.registerPartials(partialsPath)

// setup static dir to serve
app.use(express.static(publicDirectoryPath))



app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pankaj Sharma'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Pankaj Sharma'
    });
});

app.get('/help', (req, res) => {
    res.render('helper', {
        title: 'Help',
        name: 'Pankaj Sharma'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide Address for the Weather'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: foreCastData,
                location,
                address: req.query.address
            });
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pankaj Sharma',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pankaj Sharma',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => console.log(`server start at ${port}`));