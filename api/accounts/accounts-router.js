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


router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id)
    res.json(account)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    console.log('creating account with Accounts.create(req.body)')
    console.log('req.body:', req.body)
    const name = req.body.name

    const newAccount = await Accounts.create({
      name: name.trim(),
      budget: req.body.budget
    })
    res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  const updated = await Accounts.updateById(req.params.id, req.body)
  res.json(updated)
}
);

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    await Accounts.deleteById(req.params.id)
    res.json(req.account)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })
})



module.exports = router