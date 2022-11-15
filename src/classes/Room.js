class Room {
    //{"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":358.4}
    constructor(room, allBookings) {
        this.number = room.number
        this.roomType = room.roomType
        this.bidet = room.bidet
        this.bedSize = room.bedSize
        this.numBeds = room.numBeds
        this.costPerNight = room.costPerNight
        this.daysBooked = this.getDaysBooked(allBookings)
    }
    
    getDaysBooked(allBookings) {
        let daysBooked = []
        allBookings.forEach(booking => {
            if(booking.roomNumber === this.number) {
                daysBooked.push(booking.date)
            }
        })
        return daysBooked
    }

    isAvailable(date) {
        const todayArray = this.daysBooked.filter(indexDate => {
            let dateCheck = new Date(indexDate)
            return dateCheck.getTime() === date.getTime()
        })
        if(todayArray[0]) {
            return false
        } else {
            return true
        }
    }
}

export default Room