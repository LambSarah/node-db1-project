const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = id => {
  // DO YOUR MAGIC
  return db("accounts").where('id', id);
}

const create = account => {
  // DO YOUR MAGIC
  return db('accounts')
    .insert(account)
    .then(ids => {
      return getById(ids[0])
    })
    .catch(err => console.log(err))
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  return db('accounts')
    .where({ id })
    .update(account)
    // eslint-disable-next-line no-unused-vars
    .then((rows) => {
      return getById(id)
    })
    .catch(err => console.log(err));
}

const deleteById = id => {
  // DO YOUR MAGIC
  return db('accounts')
    .where('id', id)
    .del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
