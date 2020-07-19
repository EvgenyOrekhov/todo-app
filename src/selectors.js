import { v4 as uuidv4 } from "uuid";

function setIds(tasks, parentId) {
  return tasks.map((task, index) => {
    const id = [...parentId, index];

    return {
      ...task,
      id,
      children: setIds(task.children, id),
    };
  });
}

function getTasksWithIds(tasks) {
  return setIds(tasks, []);
}

function getTasksWithUniqueIds(tasks) {
  return tasks.map((task) => ({
    ...task,
    uniqueId: uuidv4(),
    children: getTasksWithUniqueIds(task.children),
  }));
}

export { getTasksWithIds, getTasksWithUniqueIds };
