const express = require('express')
const morgan = require('morgan')

const app = express()
const userAPI = require('./router/user')
const cardAPI = require('./router/card')
const loginAPI = require('./router/login')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use('/login', loginAPI)
app.use('/api/users', userAPI)
app.use('/api/cards', cardAPI)

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`App is running on port ${port}...`)
})