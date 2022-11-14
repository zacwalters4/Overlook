class User {
    constructor(user, allBookings, allRooms) {
        this.id = user.id
        this.name = user.name
        this.bookings = this.getUserBookings(allBookings)
        this.totalSpent = this.getTotalSpent(allRooms)
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

    getTotalSpent(allRooms) {
        let totalSpent = 0
        this.bookings.forEach(booking => {
            totalSpent += allRooms[booking.roomNumber - 1].costPerNight
        })
        return Math.trunc(totalSpent*100)/100
    }
}

module.exports = User