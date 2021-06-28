import { v4 as uuidv4 } from "../_snowpack/pkg/uuid.js";
import { equals } from "../_snowpack/pkg/ramda.js";

function getViewModel(state) {
  const {
    editingValuePath,
    editingContentPath,
    tasks: allTasks
  } = state;

  function setPaths(tasks, parentPath) {
    return tasks.map((task, index) => {
      const path = [...parentPath, index];
      return { ...task,
        path,
        isEditingValue: equals(path, editingValuePath),
        isEditingContent: equals(path, editingContentPath),
        children: setPaths(task.children, path)
      };
    });
  }

  return { ...state,
    isEditingValue: editingValuePath.length > 0,
    isEditingContent: editingContentPath.length > 0,
    tasks: setPaths(allTasks, [])
  };
}

function getTasksWithIds(tasks) {
  return tasks.map(task => ({ ...task,
    id: uuidv4(),
    children: getTasksWithIds(task.children)
  }));
}

export { getViewModel, getTasksWithIds };