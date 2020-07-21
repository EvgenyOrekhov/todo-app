import { v4 as uuidv4 } from "uuid";

function setPaths(tasks, parentPath) {
  return tasks.map((task, index) => {
    const path = [...parentPath, index];

    return {
      ...task,
      path,
      children: setPaths(task.children, path),
    };
  });
}

function getTasksWithPaths(tasks) {
  return setPaths(tasks, []);
}

function getTasksWithIds(tasks) {
  return tasks.map((task) => ({
    ...task,
    id: uuidv4(),
    children: getTasksWithIds(task.children),
  }));
}

export { getTasksWithPaths, getTasksWithIds };
