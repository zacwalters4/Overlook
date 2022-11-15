import chai from 'chai'
const expect = chai.expect
import { bookingsData, roomsData } from '../data/testData'
import Room from '../src/classes/Room'

describe('Room', () => {
    let room
    beforeEach(() => {
      room = new Room(roomsData[0], bookingsData)
    })

  it('should be an instance of Room', () => {
    expect(room).to.be.an.instanceOf(Room)
  })

  it('should have a number', () => {
    expect(room.number).to.equal(1)
  })

  it('should have a room type', () => {
    expect(room.roomType).to.equal("residential suite")
  })

  it('should tell if it has a bidet', () => {
    expect(room.bidet).to.equal(true)
  })

  it('should have a bed size', () => {
    expect(room.bedSize).to.equal("queen")
  })

  it('should have a number of beds', () => {
    expect(room.numBeds).to.equal(1)
  })

  it('should have a cost per night', () => {
    expect(room.costPerNight).to.equal(358.4)
  })

  it('should have a list of days booked', () => {
    expect(room.daysBooked).to.deep.equal(['2022/04/22', '2022/02/05'])
  })
  
  it('should return false if a room is booked and true if it\'s available', () => {
    let dateOne = new Date('2022/04/22')
    let dateTwo = new Date('2022/05/19')
    expect(room.isAvailable(dateOne)).to.equal(false)
    expect(room.isAvailable(dateTwo)).to.equal(true)
  })

})