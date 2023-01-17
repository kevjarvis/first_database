const {options} = require('./index.js')
const knex = require('knex')(options);


knex.schema.createTable('cars', table => {
  table.implements('id')
  table.string('name')
  table.interger('price')
})
  .then(() => console.log('table create'))
  .catch((err) => {console.log(err)})
  .finally(() => {
    knex.destroy()
  })
