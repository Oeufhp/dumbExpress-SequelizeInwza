const Card = require('../models').Card

exports.listCard = async function(req, res) {
  try {
    const cardCollection = await Card.findAll({})
    res.status(200).send(cardCollection)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.getCard = async function(req, res) {
  try {
    const card = await Card.findAll({
      where: {
        id: req.params.id
      }
    })

    if (card) {
      res.status(200).send(card)
    }  else {
      res.status(404).send('Not found ja')
    }
  } catch (err) {
    res.status(500).send(err)
  }
}
exports.createCard = async function(req, res) {
  try {
    const newCard = await Card.create({
      name: req.body.name,
      status: req.body.status,
      content: req.body.content,
      category: req.body.category,
      userId: req.body.userId
    })
    res.status(201).send({
      name: newCard.dataValues.name,
      status: newCard.dataValues.status,
      content: newCard.dataValues.content,
      category: newCard.dataValues.category,
      userId: req.body.userId
    })
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.updateCard = async function(req, res) {
  try {
    const card = await Card.findByPk(req.params.id)
    await card.update({
      name: req.body.name,
      status: req.body.status,
      content: req.body.content,
      category: req.body.category,
      userId: req.body.userId
    })

    res.status(200).send(card.dataValues)
  } catch(err) {
    console.log(err)
    res.status(500).send(err)
  }
}

exports.deleteCard = async function(req, res) {
  try {
    const card = await Card.findByPk(req.params.id)
    if (card) {
      await card.destroy({ where: { id: req.params.id } })
      res.status(204).send('Success ja')
    } else {
      res.status(404).send('Not found ja')
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}