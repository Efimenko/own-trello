const omit = (keys) => (collection) => {
  return Object.keys(collection.toJSON ? collection.toJSON() : collection)
    .filter((key) => !keys.includes(key))
    .reduce((acc, key) => {
      acc[key] = collection[key]
      return acc
    }, {})
}

const pick = (keys) => (collection) => {
  return Object.keys(collection.toJSON ? collection.toJSON() : collection)
    .filter((key) => keys.includes(key))
    .reduce((acc, key) => {
      acc[key] = collection[key]
      return acc
    }, {})
}

const checkType = (value) => Object.prototype.toString.call(value).slice(8, -1)

exports.omit = omit
exports.pick = pick
exports.checkType = checkType
