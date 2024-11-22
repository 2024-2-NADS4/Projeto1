const express = require('express')
const authController = require('../controllers/auth')
const bodyParser = require('body-parser')
const axios = require('axios')

const router = express.Router()
const app = express()
const port = 3000

router.get('/', authController.isLoggedIn, (req, res) => {
  res.render('index', {
    user: req.user
  })
})

router.get('/register', (req, res) => {
  res.render('register')
})
router.get('/registerCommon', (req, res) => {
  res.render('registerCommon')
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/profile', authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render('profile', {
      user: req.user
    })
  } else {
    res.redirect('/login')
  }
})

router.get('/contato', authController.isLoggedIn, (req, res) => {
  res.render('contato', {
    user: req.user
  })
})

router.get('/profileAdmin', authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render('profileAdmin', {
      user: req.user
    })
  } else {
    res.redirect('/login')
  }
})

router.get('/clone', authController.isLoggedIn, (req, res) => {
  res.render('clone', {
    user: req.user
  })
})

router.get('/esqueceu-senha', authController.isLoggedIn, (req, res) => {
  res.render('esqueceu-senha', {
    user: req.user
  })
})

router.get('/termosDeUso', authController.isLoggedIn, (req, res) => {
  res.render('termosDeUso', {
    user: req.user
  })
})

router.get('/privacidade', authController.isLoggedIn, (req, res) => {
  res.render('privacidade', {
    user: req.user
  })
})

/*Middleware para parsing do corpo da requisição*/
app.use(bodyParser.json())
/* Rota do webhook*/
app.post('/webhook', async (req, res) => {
  const data = req.body
  try {
    const colabUrl =
      'https://colab.research.google.com/drive/1DuMFkpSznDS0nU00vX1mz8GPAplTzGnS?usp=sharing'
    const colabResponse = await axios.post(colabUrl, data)
    res.status(200).send('Webhook received!')
  } catch (error) {
    console.error('Erro ao enviar solicitação ao Colab:', error)
    res.status(500).send('Erro ao processar o webhook.')
  }
})

/*Iniciar o servidor*/
app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`)
})

module.exports = router
