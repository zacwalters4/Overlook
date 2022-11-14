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

const bookingsContainer = document.querySelector('.bookings-container')
const upcomingButton = document.querySelector('.upcoming-button')
const pastButton = document.querySelector('.past-button')

// UTILITY FUNCTIONS

function initializeData(customerURL, bookingsURL, roomsURL) {
    Promise.all([getData(customerURL),getData(bookingsURL),getData(roomsURL)])
        .then(data => {
            customer = data[0]
            bookings = data[1].bookings
            rooms = data[2].rooms
            initializePage()
        })
        .catch(error => {
             console.log("Error: ", error)
            })
}

function initializePage() {
    initializeUser()
    updateUpcomingBookings()
}

function initializeUser() {
    user = new User(customer, bookings, rooms)
    console.log(user)
}

// EVENT LISTENERS

window.addEventListener('load', () => {
    initializeData(currentCustomerURL, allBookingsURL, allRoomsURL)
})

upcomingButton.addEventListener('click', updateUpcomingBookings)
pastButton.addEventListener('click', updatePastBookings)
// DOM UPDATING

function updatePastBookings() {
    bookingsContainer.innerHTML = `
    <div class="booking">
        <h1>Past Bookings</h1>
    </div>
    `
    user.getPastBookings().forEach(booking => {
        bookingsContainer.innerHTML += `
        <div class="booking">
            <h1>Room ${booking.roomNumber} - ${booking.date}</h1>
            <h1>Features</h1>
            <h1>$${booking.cost} per night</h1>
        </div>
        `
    })
}

function updateUpcomingBookings() {
    bookingsContainer.innerHTML = `
    <div class="booking">
        <h1>Upcoming Bookings</h1>
    </div>
    `
    user.getUpcomingBookings().forEach(booking => {
        bookingsContainer.innerHTML += `
        <div class="booking">
            <h1>Room ${booking.roomNumber} - ${booking.date}</h1>
            <h1>Features</h1>
            <h1>$${booking.cost} per night</h1>
        </div>
        `
    })
}
