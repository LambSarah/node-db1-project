const express = require('express')
const Accounts = require('./accounts-model')
const {
  //checkAccountPayload,
  checkAccountId,
  //checkAccountNameUnique
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
  console.log(req.params.id)
  const { id } = req.params.id
  console.log(id)
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

/*
router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
})

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
