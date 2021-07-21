const router = require('express').Router()
const Accounts = require('./accounts-model')
const {
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique
} = require('./accounts-middleware')



router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
})

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

module.exports = router;
