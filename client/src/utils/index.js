export const getTasksByParentId = ({parentId, tasks}) =>
  tasks.filter((task) => task.parent === parentId)

export const getUniqId = () =>
  Date.now().toString(36) +
  Math.random()
    .toString(36)
    .substr(2, 5)
