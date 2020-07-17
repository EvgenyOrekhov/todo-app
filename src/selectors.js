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

export function getTasksWithIds(tasks) {
  return setIds(tasks, []);
}
