class Booking {
    constructor(booking, allRooms) {
        this.id = booking.id
        this.userID = booking.userID
        this.date = booking.date
        this.roomNumber = booking.roomNumber
        this.cost = allRooms[booking.roomNumber - 1].costPerNight
    }
}

module.exports = Booking