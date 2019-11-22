const User = require('../models').User
const Card = require('../models').Card

function listAllUser () {
  return User.findAll({ raw: true })
}

exports.listUser = function(req, res) {
  try {
    listAllUser()
    .then(result => {
      console.log(result)
      res.status(200).send(result)  
    })
    // console.log(userCollection)
    // res.status(200).send(userCollection)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

exports.getUser = async function(req, res) {
  try {
    const user = await User.findAll({
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
    const newUser = await User.create({ email: req.body.email, name: req.body.name })
    const card = await Card.create({ 
      name: req.body.card.name,
      status: req.body.card.status,
      content: req.body.card.content,
      category: req.body.card.category,
      userId: newUser.dataValues.id
    })

    res.status(201).send({...newUser.dataValues,card: { ...card.dataValues}})
  } catch (err) {
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