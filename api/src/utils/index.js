const omit = (keys) => (collection) => {
  return Object.keys(collection)
    .filter((key) => !keys.includes(key))
    .reduce((acc, key) => {
      acc[key] = collection[key]
      return acc
    }, {})
}

exports.omit = omit
