export const getTasksByParentId = ({parentId, tasks}) =>
  tasks.filter((task) => task.parent === parentId)
