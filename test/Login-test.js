import chai from 'chai'
const expect = chai.expect
import { userData } from '../data/testData'
import Login from '../src/classes/Login'

describe('Login', () => {
    let login
    beforeEach(() => {
      login = new Login(userData)
    })

  it('should be an instance of Login', () => {
    expect(login).to.be.an.instanceOf(Login)
  })

  it('should have a password', () => {
    expect(login.password).to.equal('overlook2021')
  })

  it('should have a list of users', () => {
    expect(login.userList[0]).to.deep.equal({"id":1,"name":"Leatha Ullrich"})
    expect(login.userList[1]).to.deep.equal({"id":2,"name":"Rocio Schuster"})
  })

  it('should be able to check if an input password is correct', () => {
    expect(login.checkPassword('admin')).to.equal(false)
    expect(login.checkPassword('overlook2022')).to.equal(false)
    expect(login.checkPassword('overlook2021')).to.equal(true)
  })
  
  it('should be able to check if an input username exists', () => {
    expect(login.checkUsername('customerr5')).to.equal(false)
    expect(login.checkUsername('admin')).to.equal(false)
    expect(login.checkUsername('customer5')).to.equal(true)
    expect(login.checkUsername('customer500')).to.equal(false)
  })

  it('should return the id if username and password are correct', () => {
    expect(login.checkLogin('customer5')).to.equal(false)
    expect(login.checkLogin('admin','overlook2021')).to.equal(false)
    expect(login.checkLogin('customer4', 'overlook2021')).to.equal(4)
    expect(login.checkLogin('','overlook2021')).to.equal(false)
  })
})