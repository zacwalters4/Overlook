import './apiCalls'
import { getData } from './apiCalls'
import './css/styles.css'
import './images/turing-logo.png'


// DATA MODEL

const allCustomersURL = 'http://localhost:3001/api/v1/customers'
const currentCustomerURL = "http://localhost:3001/api/v1/customers/1"

let customer

function initializeData(url) {
    Promise.all([getData(url)])
        .then(data => {
            customer = data
            console.log(customer)
        })
        .catch(error => {
             console.log("Error: ", error)
            })
}

// EVENT LISTENERS

window.addEventListener('load', () => {
    initializeData(currentCustomer  URL)
})