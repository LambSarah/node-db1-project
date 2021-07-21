const Accounts = require('./accounts-model')

exports.checkAccountPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const changes = req.body
    if (!changes.name || !changes.budget) {
      next({
        status: 400,
        message: 'name and budget are required'
      })
    } else if (typeof changes.name !== 'string') {
      next({
        status: 400,
        message: 'name of account must be a string'
      })
    } else if (changes.name.trim().length < 3 || changes.name.trim().length > 100) {
      next({
        status: 400,
        message: 'name of account must be between 3 and 100'
      })
    } else if (changes.budget.isNaN()) {
      next({
        status: 400,
        message: 'budget of account must be a number',
      })
    } else if (changes.budget < 0 || changes.budget > 1000000) {
      next({
        status: 400,
        message: 'budget of account is too large or too small'
      })
    }
  } catch (err) {
    next(err)
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
}
