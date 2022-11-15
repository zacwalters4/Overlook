class Login {
    constructor(allUsers) {
        this.password = 'overlook2021'
        this.userList = allUsers
    }

    checkPassword(inputPassword) {
        if(inputPassword === this.password) {
            return true
        } else {
            return false
        }
    }

    checkUsername(inputUsername) {
        let check = 'customer'
        for(let i = 0; i < check.length; i++) {
            if(!check[i] === inputUsername[i] || inputUsername[i] === undefined) {
                return false
            }
        }
        let id = parseInt(inputUsername.split('r', 2)[1])
        if(Number.isInteger(id)) {
            return this.checkUsernameID(id)
        }
        return false
    }

    checkUsernameID(id) {
        let test = false
        this.userList.forEach(index => {
            if(index.id === id) {
                test = true
            }
        })
        return test
    }

    checkLogin(username, password) {
        if(this.checkUsername(username) && this.checkPassword(password)) {
            return parseInt(username.split('r', 2)[1])
        }
        return false
    }
}

export default Login