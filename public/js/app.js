

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')

const searchElement = document.querySelector('input')

const message1 = document.querySelector('#m-1')
const message2 = document.querySelector('#m-2')

//message1.textContent = 'From JS'

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = searchElement.value

    const url = '/weather?address='+location.toString()

    message1.textContent = 'Loading data'
    message2.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                message1.textContent = data.error
                return 
            }

            message1.textContent = data.location
            message2.textContent = data.forecast
            // console.log(data.location)
            // console.log(data.forecast)
        })
    })

    // console.log('testing')
})