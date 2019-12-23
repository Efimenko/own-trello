const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server')

const inMemoryMongo = new MongoMemoryServer()

/* Connect to the in-memory database */
module.exports.connectToDatabase = async () => {
  const uri = await inMemoryMongo.getConnectionString()
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }

  await mongoose.connect(uri, mongooseOpts)
}

/* Drop database, close the connection and stop mongod */
module.exports.closeConnectionToDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await inMemoryMongo.stop()
}

/* Remove all the data from all db collections */
module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
}
