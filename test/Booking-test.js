import chai from 'chai'
const expect = chai.expect
import { bookingsData, roomsData } from '../data/testData'
import Booking from '../src/classes/Booking'

describe('Booking', () => {
    let booking
    beforeEach(() => {
      booking = new Booking(bookingsData[0], roomsData)
    })

  it('should be an instance of Booking', () => {
    expect(booking).to.be.an.instanceOf(Booking)
  })

  it('should have an ID', () => {
    expect(booking.id).to.equal("5fwrgu4i7k55hl6sz")
  })

  it('should have a userID', () => {
    expect(booking.userID).to.equal(9)
  })

  it('should have a date', () => {
    expect(booking.date).to.equal("2022/04/22")
  })

  it('should have a roomNumber', () => {
    expect(booking.roomNumber).to.equal(1)
  })

  it('should have a room cost', () => {
    expect(booking.cost).to.equal(358.4)
  })
})