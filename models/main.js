class Account {
  constructor (id, firstname, lastname, tel, email, password, type) {
    this.id = id
    this.firstname = firstname
    this.lastname = lastname
    this.tel = tel
    this.email = email
    this.password = password
    this.type = type
  }
}

class ClassFitness {
  constructor (id, classname, amount) {
    this.id = id
    this.classname = classname
    this.amount = amount
  }
}

class ClassFitnessRecommend {
  constructor (id, idfitness, classname, amount, time) {
    this.id = id
    this.idfitness = idfitness
    this.classname = classname
    this.amount = amount
    this.time = time
  }
}

class SubClassFitness {
  constructor (id, classname, amount, time) {
    this.id = id
    this.classname = classname
    this.amount = amount
    this.time = time
  }
}

class Subcribe {
  constructor (id, status, time, email, firstname, lastname, tel) {
    this.id = id
    this.status = status
    this.time = time
    this.email = email
    this.firstname = firstname
    this.lastname = lastname
    this.tel = tel
  }
}

module.exports = {
  Account,
  ClassFitness,
  ClassFitnessRecommend,
  SubClassFitness,
  Subcribe
}
