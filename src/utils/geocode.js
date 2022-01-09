const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFkaHVyMDciLCJhIjoiY2t5MWRleWR4MGFmczJvcm10ZHdveHB2aSJ9._Cr_ozdTdcON42IsjHE6aQ'

    request({url, json : true}, (error, {body} = {}) => { //destructuring objects
        if(error){
            callback('Can\'t connect to the geo-coding service.', undefined)
        }
        else if(body.features.length === 0){
        
            callback('Can\'t find the location.', undefined)
        }
        else {
            const data = body.features[0]
            callback(undefined, {
                latitude : data.center[1],
                longitude : data.center[0],
                place : data.place_name
            })
        }
    })
}

module.exports = geocode