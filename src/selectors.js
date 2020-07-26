import { v4 as uuidv4 } from "uuid";
import { equals } from "ramda";

function getTasks({ editingValuePath, editingContentPath, tasks: allTasks }) {
  function setPaths(tasks, parentPath) {
    return tasks.map((task, index) => {
      const path = [...parentPath, index];

      return {
        ...task,
        path,
        isEditingValue: equals(path, editingValuePath),
        isEditingContent: equals(path, editingContentPath),
        children: setPaths(task.children, path),
      };
    });
  }

  return setPaths(allTasks, []);
}

function getTasksWithIds(tasks) {
  return tasks.map((task) => ({
    ...task,
    id: uuidv4(),
    children: getTasksWithIds(task.children),
  }));
}

export { getTasks, getTasksWithIds };
