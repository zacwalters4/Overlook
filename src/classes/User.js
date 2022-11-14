class User {
    constructor(user, allBookings, roomsData) {
        this.id = user.id
        this.name = user.name
        this.bookings = this.getUserBookings(allBookings)
        this.totalSpent = this.getTotalSpent(roomsData)
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

    getTotalSpent(roomsData) {
        let totalSpent = 0
        this.bookings.forEach(booking => {
            totalSpent += roomsData[booking.roomNumber - 1].costPerNight
        })
        return totalSpent
    }
}

module.exports = User