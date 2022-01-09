const hbs = require('hbs')
const express = require('express')
const path = require('path')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname, __filename)
// console.log(path.join(__dirname, '../public'))


const app = express()
const port = process.env.PORT || 3000

//defining path for express config
const publicDirPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../views/partials')

//setup handlebars engine
app.set('view engine', 'hbs')

//register partials(headers/footers)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather Application',
        name: 'Madhur Saxena'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help Page',
        helptext : 'This is the helpful text to understand.',
        name: 'Madhur Saxena'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Madhur Saxena'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Address not specified.'
        })
    }
    // console.log(req.query)
    // res.send({
    //     address : req.query.address,
    //     location : 'New Delhi',
    //     forecast : 'cloudy'
    // })
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, place} = {}) => {
        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                forecast : forecastData,
                location : place,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: 'Error',
        text : 'Help article not found',
        name: 'Madhur Saxena'
    })
})
app.get('*', (req, res) => {
    res.render('error',{
        title: 'Error 404',
        text : 'Page not found',
        name: 'Madhur Saxena'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})

