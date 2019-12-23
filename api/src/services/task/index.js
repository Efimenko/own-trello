const {getAll} = require('./get-all')
const {getOne} = require('./get-one')
const {add} = require('./add')
const {update} = require('./update')
const {remove} = require('./remove')

exports.task = {getAll, getOne, add, update, remove}
