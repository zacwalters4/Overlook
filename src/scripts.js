import './apiCalls'
import { getData } from './apiCalls'
import './css/styles.css'
import './images/turing-logo.png'
import User from '../src/classes/User'

// DATA MODEL

const allCustomersURL = 'http://localhost:3001/api/v1/customers'
const currentCustomerURL = 'http://localhost:3001/api/v1/customers/1'
const allBookingsURL = 'http://localhost:3001/api/v1/bookings'
const allRoomsURL = 'http://localhost:3001/api/v1/rooms'

let customer
let bookings
let rooms
let user

// QUERY SELECTORS

// UTILITY FUNCTIONS

function initializeData(customerURL, bookingsURL, roomsURL) {
    Promise.all([getData(customerURL),getData(bookingsURL),getData(roomsURL)])
        .then(data => {
            customer = data[0]
            bookings = data[1].bookings
            rooms = data[2].rooms
            // console.log(customer)
            // console.log(bookings)
            // console.log(rooms)
            initializePage()
        })
        .catch(error => {
             console.log("Error: ", error)
            })
}

function initializePage() {
    initializeUser()
}

function initializeUser() {
    user = new User(customer, bookings, rooms)
    console.log(user)

}

// EVENT LISTENERS

window.addEventListener('load', () => {
    initializeData(currentCustomerURL, allBookingsURL, allRoomsURL)
})

// DOM UPDATING

function updatePastBookings() {

}
