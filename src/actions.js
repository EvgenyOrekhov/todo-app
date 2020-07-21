import {
  over,
  set,
  not,
  lensPath,
  intersperse,
  pipe,
  mergeLeft,
  init,
  last,
  remove,
  append,
  path as getAtPath,
  evolve,
} from "ramda";
import { v4 as uuidv4 } from "uuid";

const getFullPath = intersperse("children");

const getFullPathToSiblings = pipe(init, getFullPath, append("children"));

function updateAtPath(path, callback) {
  return over(lensPath(path), callback);
}

function setAtPath(path, value) {
  return set(lensPath(path), value);
}

function deleteAtPath(path) {
  return updateAtPath(getFullPathToSiblings(path), remove(last(path), 1));
}

function move(indexShift) {
  return (path, tasks) => {
    const newIndex = last(path) + indexShift;
    const siblings = getAtPath(getFullPathToSiblings(path), tasks);

    if (newIndex < 0 || newIndex >= siblings.length) {
      return tasks;
    }

    const taskPath = getFullPath(path);
    const previousTaskPath = [...init(taskPath), newIndex];

    const task = getAtPath(taskPath, tasks);
    const previousTask = getAtPath(previousTaskPath, tasks);

    return pipe(
      setAtPath(previousTaskPath, task),
      setAtPath(taskPath, previousTask)
    )(tasks);
  };
}

function makeTask() {
  return {
    id: uuidv4(),
    value: "",
    content: "",
    isDone: false,
    children: [],
  };
}

function appendNewTask(tasks) {
  return append(makeTask(), tasks);
}

function addNextTask(parentPath, state) {
  return pipe(
    updateAtPath(
      ["tasks", ...getFullPathToSiblings(parentPath)],
      appendNewTask
    ),
    mergeLeft({
      editingValuePath: [
        ...init(parentPath),
        getAtPath(
          ["tasks", ...getFullPathToSiblings(parentPath), "length"],
          state
        ),
      ],
    })
  )(state);
}

function makeSetter(property) {
  return (path, value) => setAtPath([...getFullPath(path), property], value);
}

const setValue = makeSetter("value");
const setContent = makeSetter("content");

const actions = {
  tasks: {
    toggle: (path) => updateAtPath([...getFullPath(path), "isDone"], not),

    delete: deleteAtPath,

    // eslint-disable-next-line no-magic-numbers
    moveUp: move(-1),

    moveDown: move(1),
  },

  setValue: (value, state) => {
    const trimmedValue = value.trim();

    return pipe(
      evolve({
        tasks:
          trimmedValue === ""
            ? deleteAtPath(state.editingValuePath)
            : setValue(state.editingValuePath, trimmedValue),
      }),
      mergeLeft({ editingValuePath: [] })
    )(state);
  },

  setContent: (content, state) =>
    pipe(
      evolve({ tasks: setContent(state.editingContentPath, content) }),
      mergeLeft({ editingContentPath: [] })
    )(state),

  addTask: (ignore, state) => addNextTask([0, 0], state),

  addNextTask,

  addSubtask: (parentPath, state) =>
    pipe(
      updateAtPath(
        ["tasks", ...getFullPath(parentPath), "children"],
        appendNewTask
      ),
      mergeLeft({
        editingValuePath: [
          ...parentPath,
          getAtPath(
            ["tasks", ...getFullPath(parentPath), "children", "length"],
            state
          ),
        ],
      })
    )(state),
};

// eslint-disable-next-line import/no-unused-modules
export default actions;
