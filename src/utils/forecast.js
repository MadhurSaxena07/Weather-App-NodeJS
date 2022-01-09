const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=88588f0fbff7fb01a5129038738ea3d8&query='+ latitude + ',' + longitude +'&units=f'

    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Can\'t connect to weather service.', undefined)
        }
        else if(body.error){
            callback('Unable to find location.', undefined)
        }
        else{
            const data = body.current
            callback(undefined, data.weather_descriptions + '. The temprature is '+data.temperature+' degrees but it feels like '+data.feelslike+' degrees. The humidity is '+data.humidity)
        }
    })
}

module.exports = forecast