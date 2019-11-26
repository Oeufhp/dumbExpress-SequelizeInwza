const User = require('../models').User
const Card = require('../models').Card
const bcrypt = require('bcrypt')
const saltRounds = 10

function listAllUser () {
  return User.findAll({ raw: true })
}

exports.listUser = async function(req, res) {
  try {
    const users = await User.findAll({ raw: true })
    res.status(200).send(users)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

exports.getUser = async function(req, res) {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      },
      raw: true
    })

    console.log(user)

    if (user) {
      res.status(200).send(user)
    }  else {
      res.status(404).send('Not found ja')
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.createUser = async function(req, res) {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
    const user = await User.create({ name: req.body.name, email: req.body.email, password: passwordHash })

    res.status(201).send(user)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

exports.updateUser = async function(req, res) {
  try {
    const user = await User.findByPk(req.params.id)
    await user.update({
      name: req.body.name,
      email: req.body.email
    })
    res.status(200).send(user.dataValues)
  } catch(err) {
    console.log(err)
    res.status(500).send(err)
  }
}

exports.deleteUser = async function(req, res) {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) {
      await user.destroy({where: { id: req.params.id }})
      res.status(204).status('Success ja')
    } else {
      res.status(404).send('Not found ja')
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}