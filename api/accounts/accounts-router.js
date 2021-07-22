const express = require('express')
const Accounts = require('./accounts-model')
const {
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique
} = require('./accounts-middleware')

const router = express.Router()
router.use(express.json())


router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
    .then(accounts => {
      accounts.length > 0 ? res.status(200).json(accounts)
        :
        res.status(200).json([])
    })
    .catch(err => {
      next(err)
    })
})


router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC'
  console.log('reqParamsId:', req.params.id)
  const { id } = req.params.id
  console.log('router--id:', id)
  Accounts.getById(req.params.id)
    .then(account => {
      account ?
        res.status(200).json(account)
        :
        next()
    })
    .catch(err => {
      next(err)
    })
})


router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  console.log('creating account with Accounts.create(req.body)')
  console.log('req.body:', req.body)
  const name = req.body.name
  Accounts.create({
    name: name.trim(),
    budget: req.body.budget
  })
    .then(newAccount => {
      console.log('awaited create call: ', newAccount)
      if (newAccount) {
        res.status(201).json(newAccount)
        console.log('getting newAccount details')
      } else {
        res.status(404).json({
          message: 'could not create account'
        })
      }
    }).catch(err => {
      next(err)
    })
})
/*
router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})
 */
module.exports = router;
