const Accounts = require('./accounts-model')
const db = require('../../data/db-config')

const checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const error = { status: 400 }
  const { name, budget } = req.body
  console.log('checking if all reqd fields included')
  if (name === undefined || budget === undefined) {
    console.log('Error thrown: name and budget are required')
    error.message = 'name and budget are required'
  } else if (typeof name !== 'string') {
    console.log("Error thrown: name of account must be string")
    error.message = 'name of account must be a string'
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    error.message = 'name of account must be between 3 and 100'
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    error.message = 'budget of account must be a number'
  } else if (budget < 0 || budget > 1000000) {
    error.message = 'budget of account is too large or too small'
  }

  if (error.message) {
    next(error)
  } else {
    next()
  }
}

const checkAccountNameUnique = async (req, res, next) => {
  try {
    console.log('Checking uniqueNameReq')
    const existing = await db('accounts')
      .where('name', req.body.name.trim())
      .first()

    if (existing) {
      next({ status: 400, message: 'that name is taken' })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkAccountId = async (req, res, next) => {
  console.log('Checking account id')
  console.log('params:', req.params)
  const id = req.params.id
  console.log('id:', id)
  try {
    const account = await Accounts.getById(req.params.id)
    if (!account) {
      next({
        status: 404,
        message: 'account not found'
      })
    } else {
      res.account = account
      next()
    }
  } catch (err) {
    next(err)
  }
}

const notFound = (req, res, next) => { // eslint-disable-line
  res.status(404).json({
    message: 'Resource not found'
  })
}

const errorHandling = (err, req, res, next) => { // eslint-disable-line
  const status = err.status || 500
  res.status(status).json({
    message: err.message,
  })
}

const logger = (req, res, next) => {
  let current_date_time = new Date()
  let formatted_date_time =
    current_date_time.getFullYear()
    + '-'
    + (current_date_time.getMonth() + 1)
    + '-'
    + current_date_time.getDate()
    + ' '
    + current_date_time.getHours()
    + ':'
    + current_date_time.getMinutes()
    + ':'
    + current_date_time.getSeconds();

  let method = req.method
  let url = req.url
  let host = req.headers.host

  console.log(`Method: ${method}`)
  console.log(`Request url: ${url} from: ${host} on ${formatted_date_time}`)
  next()
}



module.exports = {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
  errorHandling,
  logger,
  notFound
}