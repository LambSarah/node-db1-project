const Accounts = require('./accounts-model')

const checkAccountPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    console.log('req method: ', req.method)
    const changes = req.body
    const name = changes.name
    const trimmedName = name.trimStart();

    console.log('checking if all reqd fields included')
    if (!changes.name || !changes.budget) {
      console.log('Error thrown: name and budget are required')
      next({
        status: 400,
        message: 'name and budget are required'
      })
    }
    console.log('checking if name is a string')
    if (typeof changes.name !== 'string') {
      console.log("Error thrown: name of account must be string")
      next({
        status: 400,
        message: 'name of account must be a string'
      })
    }
    console.log('checking if name is correct length')
    if (trimmedName.length < 3 || trimmedName.length > 100) {
      console.log('Error thrown:. name of acct must be 3-100')
      next({
        status: 400,
        message: 'name of account must be between 3 and 100'
      })
    }
    console.log('checking if budget is a number')
    if (Number.isNaN(changes.budget)) {
      console.log('Error thrown: NaN')
      next({
        status: 400,
        message: 'budget of account must be a number',
      })
    }
    console.log('checking if budget is right size')

    if (changes.budget < 0 || changes.budget > 1000000) {
      console.log('ErrorThrown: 0-1000000')
      next({
        status: 400,
        message: 'budget of account is too large or too small'
      })
    }
    console.log('passed payload check')
    next()
  } catch (err) {
    next(err)
  }
}

const checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  console.log('Checking uniqueNameReq')

  let name = req.body.name
  name = name.trim()
  console.log('trimmed name:', name)
  Accounts.getAll()
    .then(accounts => {
      console.log('accounts: ', accounts)
      let matches = accounts.map(account => account.name.trim(account.name) === name)
      // const matches = accounts.map(account => account.name === name)
      if (matches.length === 0) {
        console.log('passed unique name check')
        next()
      } else {
        next({
          status: 400,
          message: 'that name is taken'
        })
      }
    }
    ).catch(err => {
      next(err)
    })
}

const checkAccountId = (req, res, next) => {
  console.log('Checking account id')
  console.log('params:', req.params)
  const id = req.params.id
  console.log('id:', id)

  Accounts.getById(id)
    .then(account => {
      if (account !== []) {
        console.log('account:', account)
        req.account = account
        next()
      } else {
        next({
          status: 404,
          message: 'account not found'
        })
      }
    }).catch(err => {
      next(err)
    }
    )
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