import Booking from './Booking'

class User {
    constructor(user, allBookings, allRooms) {
        this.id = user.id
        this.name = user.name
        this.bookings = this.getUserBookings(allBookings, allRooms)
        this.totalSpent = this.getTotalSpent(allRooms)
    }

    getUserBookings(allBookings, allRooms) {
        const userBookings = allBookings.filter(booking => booking.userID === this.id)
        return userBookings.map(booking => {
            return new Booking(booking, allRooms)
        })
    }

    getPastBookings() {
        const pastBookings = this.bookings.filter(booking => {
            let bookingDate = new Date(booking.date)
            console.log(bookingDate.getDate())
            bookingDate.setDate(bookingDate.getDate()+1)
            console.log(bookingDate.getDate())
            return (bookingDate < Date.now())
        })
        return pastBookings
    }

    getUpcomingBookings() {
        const upcomingBookings = this.bookings.filter(booking => {
            let bookingDate = new Date(booking.date)
            bookingDate.setDate(bookingDate.getDate()+1)
            return (bookingDate > Date.now())
        })
        return upcomingBookings
    }

    getTotalSpent() {
        let totalSpent = 0.00
        this.bookings.forEach(booking => {
            totalSpent += booking.cost
        })
        return Math.trunc(totalSpent*100)/100
    }
}

export default User