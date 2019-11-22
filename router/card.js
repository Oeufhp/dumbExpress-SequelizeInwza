const express = require('express')
const router = express.Router()

const cardController = require('../controllers/card')

router.get('/', cardController.listCard)
router.get('/:id', cardController.getCard)
router.post('/', cardController.createCard)
router.post('/:id', cardController.updateCard)
router.delete('/:id', cardController.deleteCard)

module.exports = router