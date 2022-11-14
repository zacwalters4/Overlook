class User {
    constructor(user, allBookings) {
        this.id = user.id
        this.name = user.name
        this.bookings = getUserBookings(allBookings)
    }
    getUserBookings(allBookings) {
        const userBookings = allBookings.filter(booking => booking.userID === this.id)
        return userBookings
    }
}