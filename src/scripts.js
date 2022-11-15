import './apiCalls'
import { getData } from './apiCalls'
import './css/styles.css'
import './images/turing-logo.png'
import User from '../src/classes/User'
import Room from '../src/classes/Room'

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
const welcomeMessage = document.querySelector('.welcome-message')
const yearDropdown = document.getElementById('year-dropdown')
const monthDropdown = document.getElementById('month-dropdown')
const dateDropdown = document.getElementById('date-dropdown')
const newBookingButton = document.querySelector('.new-button')
const searchButton = document.querySelector('.search-button')
const dateSelectContainer = document.querySelector('.date-select-container')

// UTILITY FUNCTIONS

function initializeData(customerURL, bookingsURL, roomsURL) {
    Promise.all([getData(customerURL),getData(bookingsURL),getData(roomsURL)])
        .then(data => {
            customer = data[0]
            bookings = data[1].bookings
            rooms = instantiateRooms(data[2].rooms, bookings)
            console.log(rooms)
            initializePage()
        })
        .catch(error => {
             console.log("Error: ", error)
            })
}

function initializePage() {
    initializeUser()
    updateUpcomingBookings()
    updateWelcomeMessage()
    fillDropdowns()
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
newBookingButton.addEventListener('click', loadNewBookingPage)

yearDropdown.addEventListener('change', fillDateDropdown)
monthDropdown.addEventListener('change', fillDateDropdown)
searchButton.addEventListener('click', searchAvailableRooms)
// DOM UPDATING

function updateWelcomeMessage() {
    welcomeMessage.innerText = `Hello ${user.name}!`
}

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
                <h1>${booking.roomType}</h1>
                <h1>$${booking.cost} per night</h1>
            </div>
        `
    })
    dateSelectContainer.classList.add('hidden')
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
                <h1>${booking.roomType}</h1>
                <h1>$${booking.cost} per night</h1>
            </div>
        `
    })
    dateSelectContainer.classList.add('hidden')
}

function loadNewBookingPage() {
    dateSelectContainer.classList.remove('hidden')
    bookingsContainer.innerHTML = `
        <div class="booking">
            <h1>Available Rooms</h1>
        </div>
    `
    fillDropdowns()
}

function fillDropdowns() {
    fillYearDropdown()
    fillMonthDropdown()
    fillDateDropdown()
}

function fillYearDropdown() {
    const year = new Date().getFullYear()
    for(let i = year; i <= 2025; i++) {
        const option = document.createElement('OPTION')
        option.innerHTML = i
        option.value = i
        yearDropdown.append(option)
    }
}

function fillMonthDropdown() {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December",]
    let monthValue = 0
    months.forEach(month => {
        const option = document.createElement('OPTION')
        option.innerHTML = month
        option.value = monthValue
        monthValue++
        monthDropdown.append(option)
    })
}

function fillDateDropdown() {
    dateDropdown.innerHTML = ''
    const year = yearDropdown.value
    const month = parseInt(monthDropdown.value) + 1
    const days = new Date(year, month, 0).getDate()

    for(let i = 1; i <= days; i++) {
        const option = document.createElement('OPTION')
        option.innerHTML = i
        option.value = i
        dateDropdown.append(option)
    }
}

function searchAvailableRooms() {
    let day, month, year
    day = dateDropdown.value
    month = monthDropdown.value
    year = yearDropdown.value
    let dateInput = getDateInput(day, month, year)
    checkRoomAvailability(dateInput)
    bookingsContainer.innerHTML = `
        <div class="booking">
            <h1>Available Rooms for ${year}/${month + 1}/${day}</h1>
        </div>
    `
    
}

function displayAvailableRooms() {
    availableRooms.forEach(room => {
        bookingsContainer.innerHTML += `
            <div class="booking">
                <h1>Room ${room.number} - ${room.roomType}</h1>
                <h1>${room.numBeds} ${room.bedSize} beds</h1>
                <h1>$${room.costPerNight} per night</h1>
            </div>
        `
    })
}

function getDateInput(day, month, year) {
    const dateInput = new Date(year, month, day)
    console.log(dateInput)
    return dateInput
}

function checkRoomAvailability(date) {
    const dateBookings = bookings.filter(booking => {
        let bookingDate = new Date(booking.date)
        return bookingDate.getTime() === date.getTime()
    })
    console.log(dateBookings)
}

function instantiateRooms(roomsArray) {
    return roomsArray.map(room => {
        return new Room(room, bookings)
    })
}