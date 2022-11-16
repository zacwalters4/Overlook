import './apiCalls'
import { getData, postData } from './apiCalls'
import './css/styles.css'
import './images/turing-logo.png'
import User from '../src/classes/User'
import Room from '../src/classes/Room'
import Login from '../src/classes/Login'

// DATA MODEL

const allCustomersURL = 'http://localhost:3001/api/v1/customers'
const allBookingsURL = 'http://localhost:3001/api/v1/bookings'
const allRoomsURL = 'http://localhost:3001/api/v1/rooms'

let day, month, year
let allCustomers
let customer
let bookings
let rooms
let allRooms
let user
let login
let id

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
const filterDropdown = document.getElementById('filter-dropdown')
const filterContainer = document.querySelector('.filter-container')
const usernameField = document.querySelector('.username-field')
const passwordField = document.querySelector('.password-field')
const loginButton = document.querySelector('.login-button')
const passFailText = document.querySelector('.password-fail')
const buttonContainer = document.querySelector('.button-container')
const loginContainer = document.querySelector('.login-container')

// UTILITY FUNCTIONS

function initializeData(allCustomersURL, bookingsURL, roomsURL) {
    Promise.all([getData(allCustomersURL),getData(bookingsURL),getData(roomsURL)])
        .then(data => {
            allCustomers = data[0].customers
            bookings = data[1].bookings
            allRooms = data[2].rooms
            initializeLogin()
        })
        .catch(error => {
             console.log("Error: ", error)
            })
}

function initializeLogin() {
    login = new Login(allCustomers)
}

function initializePage() {
    rooms = instantiateRooms(allRooms, bookings)
    initializeUser()
    updateUpcomingBookings()
    updateWelcomeMessage()
}

function initializeUser() {
    user = new User(allCustomers[id - 1], bookings, rooms)
}

// EVENT LISTENERS

window.addEventListener('load', () => {
    initializeData(allCustomersURL, allBookingsURL, allRoomsURL)
    fillDropdowns()
})

bookingsContainer.addEventListener('click', event => {
    if(event.target.classList.value === 'new-booking-button') {
        let newBooking = bookRoom(event)
        postData(newBooking, allBookingsURL)
            .then(() => fetchBookings())
    }
})

upcomingButton.addEventListener('click', updateUpcomingBookings)
pastButton.addEventListener('click', updatePastBookings)
newBookingButton.addEventListener('click', loadNewBookingPage)
yearDropdown.addEventListener('change', fillDateDropdown)
monthDropdown.addEventListener('change', fillDateDropdown)
filterDropdown.addEventListener('change', filterRooms)
searchButton.addEventListener('click', searchAvailableRooms)
loginButton.addEventListener('click', attemptLogin)

// DOM UPDATING

function updateWelcomeMessage() {
    welcomeMessage.innerText = `Hello ${user.name}! You've spent $${user.getTotalSpent()}`
}

function updatePastBookings() {
    bookingsContainer.innerHTML = `
        <div tabindex="0" class="booking">
            <h1>Past Bookings</h1>
        </div>
    `
    user.getPastBookings().forEach(booking => {
        bookingsContainer.innerHTML += `
            <div tabindex="0" class="booking">
                <h1>Room ${booking.roomNumber} - ${booking.date}</h1>
                <h1>${booking.roomType}</h1>
                <h1>$${booking.cost} per night</h1>
            </div>
        `
    })
    hideNewBookingElements()
}

function updateUpcomingBookings() {
    bookingsContainer.innerHTML = `
        <div tabindex="0" class="booking">
            <h1>Upcoming Bookings</h1>
        </div>
    `
    user.getUpcomingBookings().forEach(booking => {
        bookingsContainer.innerHTML += `
            <div tabindex="0" class="booking">
                <h1>Room ${booking.roomNumber} - ${booking.date}</h1>
                <h1>${booking.roomType}</h1>
                <h1>$${booking.cost} per night</h1>
            </div>
        `
    })
    hideNewBookingElements()
}

function hideNewBookingElements() {
    dateSelectContainer.classList.add('hidden')
    filterContainer.classList.add('hidden')
    bookingsContainer.classList.remove('new')
}

function loadNewBookingPage() {
    dateSelectContainer.classList.remove('hidden')
    filterContainer.classList.remove('hidden')
    bookingsContainer.classList.add('new')
    bookingsContainer.innerHTML = `
        <div class="booking">
            <h1>Available Rooms</h1>
        </div>
    `
}

function fillDropdowns() {
    fillYearDropdown()
    fillMonthDropdown()
    fillDateDropdown()
    fillFilter()
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
    let monthValue = 1
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
    day = parseInt(dateDropdown.value)
    month = monthDropdown.value
    year = yearDropdown.value

    let dateInput = getDateInput(day, month, year)
    displayAvailableRooms(checkRoomAvailability(dateInput))
}

function displayAvailableRooms(availableRooms) {
    bookingsContainer.innerHTML = `
        <div tabindex="0" class="booking">
            <h1>Available Rooms for ${year}/${month}/${day}</h1>
        </div>
    `
    if(typeof availableRooms === 'string') {
        bookingsContainer.innerHTML += `
        <div tabindex="0" class="booking">
            <h1>You can not book a room in the past!</h1>
        </div>
    `
    } else if(availableRooms[0]) {
        availableRooms.forEach(room => {
            bookingsContainer.innerHTML += `
                <div tabindex="0" class="booking new">
                    <h1>Room ${room.number} - ${room.roomType}</h1>
                    <h1>${room.numBeds} ${room.bedSize} beds</h1>
                    <h1>$${room.costPerNight} per night</h1>
                    <button class="new-booking-button" id="${room.number}">Book This Room</button>
                </div>
            `
        })
    }
    else {
        bookingsContainer.innerHTML += `
        <div class="booking">
            <h1>Our apologies! All of our rooms are full on this date.</h1>
        </div>
    `
    }
}

function getDateInput(day, month, year) {
    const dateInput = new Date(year, month - 1, day + 1)
    return dateInput
}

function checkRoomAvailability(date) {
    if(date >= Date.now()){
        const availableRooms = rooms.filter(room => {
            return room.isAvailable(date)
        })
        return availableRooms
    }
    return 'Sorry, you can not book a date in the past.'
}   

function instantiateRooms(roomsArray) {
    return roomsArray.map(room => {
        return new Room(room, bookings)
    })
}

function fillFilter() {
    filterDropdown.innerHTML = ''
    const roomTypes = ["none","residential suite","suite","single room","junior suite"]
    roomTypes.forEach(type => {
        const option = document.createElement('OPTION')
        option.innerHTML = type
        option.value = type
        filterDropdown.append(option)
    })
}

function filterRooms() {
    let dateInput = getDateInput(day, month, year)
    const filteredRooms = checkRoomAvailability(dateInput).filter(room => {
        return room.roomType === filterDropdown.value
    })
    displayAvailableRooms(filteredRooms)
}
function bookRoom(event) {
    let userID = user.id
    let date = `${year}/${month}/${day}`
    let roomNumber = parseInt(event.target.id)
    alert(`You booked room ${roomNumber} for ${date}!`)
    return buildPost(userID, date, roomNumber)
}

function buildPost(userID, date, roomNumber) {
    return {
        userID: userID,
        date: date,
        roomNumber: roomNumber
    }
}

function fetchBookings() {
    fetch(allBookingsURL)
      .then(response => response.json())
      .then(data => bookings = data.bookings)
      .then(() => {
        initializePage()
      })
      .catch(err => console.log(err))
  }

  function attemptLogin() {
    if(!login.checkLogin(usernameField.value, passwordField.value)) {
        passFailText.innerText = 'We do not recognize your login credentials, please try again.'
    } else {
        passFailText.innerText = ''
        id = login.checkLogin(usernameField.value, passwordField.value)
        initializePage()
        loginContainer.classList.add('hidden')
        buttonContainer.classList.remove('hidden')
    }
  }
