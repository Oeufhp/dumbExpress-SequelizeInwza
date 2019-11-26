const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const userAPI = require('./router/user')
const cardAPI = require('./router/card')
const User = require('./models').User


const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('tiny'))
app.use('/api/users', userAPI)
app.use('/api/cards', cardAPI)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`App is running on port ${port}...`)
})

/* passport setup */

app.use(passport.initialize())
app.use(passport.session())

app.get('/success', (req, res) => res.status(200).send(`Welcome ${res}`))
app.get('/error', (req, res) => res.status(400).send('error'))

passport.serializeUser(function(user, cb) {
  cb(null, user)
})

passport.deserializeUser(async function(obj, cb) {
  try {
    const user = await User.findByPk(id)
    cb(null, user)
  } catch(err) {
    cb(err, null)
  }
})

passport.use(new LocalStrategy(async function(username, password, done){
    try {
      const user = await User.findOne({ where: { email: username } })
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (passwordMatch) {
        return done(null, user)
      } else {

      }
    } catch(err) {

    }
  }
))