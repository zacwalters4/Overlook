class User {
    constructor(user, allBookings) {
        this.id = user.id
        this.name = user.name
        this.bookings = this.getUserBookings(allBookings)
    }

    getUserBookings(allBookings) {
        const userBookings = allBookings.filter(booking => booking.userID === this.id)
        return userBookings
    }

    getPastBookings() {
        const pastBookings = this.bookings.filter(booking => {
            let bookingDate = new Date(booking.date)
            return (bookingDate < Date.now())
        })
        return pastBookings
    }

    getUpcomingBookings() {
        const upcomingBookings = this.bookings.filter(booking => {
            let bookingDate = new Date(booking.date)
            return (bookingDate > Date.now())
        })
        return upcomingBookings
    }
}

module.exports = User