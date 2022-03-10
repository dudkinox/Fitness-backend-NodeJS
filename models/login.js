class Account {
    constructor(id, firstname,lastname,tel,email, password, type) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.tel = tel;
        this.email = email;
        this.password = password;
        this.type = type;
    }
}

module.exports = Account;