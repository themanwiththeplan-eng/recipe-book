const router = require('express').Router()

const { render } = require('express/lib/response')
const { User } = require('../../models')

//Post login
router.post('/register', async (req, res) => {
    console.log(req.body);
  try {
    const dbUserData = await User.create(JSON.stringify({
      username: "Dakota",
      email: "dakotadunn5@gmail.com",
      password: "123456",
    }))
    req.session.save(() => {
      req.session.loggedIn = true

      res.status(200).json(dbUserData)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    })
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' })
      return
    }
    const validPassword = await dbUserData.checkPassword(req.body.password)
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' })
      return
    }
    req.session.save(() => {
      req.session.loggedIn = true

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
    
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
  res.render('register')
})

//Post register

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id
        req.session.username = dbUserData.username
        req.session.loggedIn = true

        res.json(dbUserData)
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

module.exports = router
