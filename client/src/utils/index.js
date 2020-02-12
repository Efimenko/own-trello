// @flow

type Task = {
  parent: string,
}

type getTasksByParentIdPropT = {
  parentId: string,
  tasks: Array<Task>,
}

export const getTasksByParentId = ({
  parentId,
  tasks,
}: getTasksByParentIdPropT): Array<Task> =>
  tasks.filter((task) => task.parent === parentId)

export const getUniqId = () =>
  Date.now().toString(36) +
  Math.random()
    .toString(36)
    .substr(2, 5)
