import chai from 'chai'
const expect = chai.expect
import { userData, bookingsData, roomsData } from '../data/testData'
import User from '../src/classes/User'

describe('User', () => {
    let user
    beforeEach(() => {
      user = new User(userData, bookingsData, roomsData)
    })

  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceOf(User)
  })

  it('should have an ID', () => {
    expect(user.id).to.equal(1)
  })

  it('should have a name', () => {
    expect(user.name).to.equal('Leatha Ullrich')
  })

  it('should have an array of the user\'s bookings', () => {
    expect(user.bookings).to.deep.equal([{"id":"5fwrgu4i7k55hl6t8","userID":1,"date":"2022/02/05","roomNumber":1,"cost": 358.4,"roomType": "residential suite"}, {"id":"5fwrgu4i7k55hl6x8","userID":1,"date":"2023/01/11","roomNumber":3,"cost": 491.14,"roomType": "single room"}])
  })

  it('should be able to return an array of the user\'s past bookings', () => {
    expect(user.getPastBookings()).to.deep.equal([{"id":"5fwrgu4i7k55hl6t8","userID":1,"date":"2022/02/05","roomNumber":1,"cost": 358.4, "roomType": "residential suite"}])
  })

  it('should be able to return an array of the user\'s upcoming bookings', () => {
    expect(user.getUpcomingBookings()).to.deep.equal([{"id":"5fwrgu4i7k55hl6x8","userID":1,"date":"2023/01/11","roomNumber":3,"cost": 491.14,"roomType": "single room"}])
  })

  it('should have a total amount spent', () => {
    expect(user.totalSpent).to.equal(849.54)
  })

})