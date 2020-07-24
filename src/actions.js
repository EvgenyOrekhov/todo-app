import merge from "mergerino";
import {
  not,
  intersperse,
  pipe,
  init,
  last,
  append,
  path as getAtPath,
  assocPath,
  map,
  curry,
} from "ramda";
import { v4 as uuidv4 } from "uuid";

const getFullPath = pipe(intersperse("children"), map(String));

const getFullPathToSiblings = pipe(init, getFullPath, append("children"));

function setAtPath(path, value) {
  return assocPath(path, value, {});
}

const deleteAtPath = curry((path, tasks) =>
  merge(tasks, setAtPath(getFullPath(path), undefined))
);

function move(indexShift) {
  return (path, tasks) => {
    const newIndex = last(path) + indexShift;
    const siblings = getAtPath(getFullPathToSiblings(path), tasks);

    if (newIndex < 0 || newIndex >= siblings.length) {
      return tasks;
    }

    const taskPath = getFullPath(path);
    const previousTaskPath = getFullPath([...init(path), newIndex]);

    const task = getAtPath(taskPath, tasks);
    const previousTask = getAtPath(previousTaskPath, tasks);

    return merge(
      tasks,
      setAtPath(previousTaskPath, () => task),
      setAtPath(taskPath, () => previousTask)
    );
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
  return merge(state, {
    tasks: setAtPath(getFullPathToSiblings(parentPath), appendNewTask),

    editingValuePath: [
      ...init(parentPath),
      getAtPath(
        ["tasks", ...getFullPathToSiblings(parentPath), "length"],
        state
      ),
    ],
  });
}

function makeSetter(property) {
  return (path, value) => setAtPath([...getFullPath(path), property], value);
}

const setValueAtPath = makeSetter("value");
const setContentAtPath = makeSetter("content");
const setIsDoneAtPath = makeSetter("isDone");
const setChildrenAtPath = makeSetter("children");

function setValue(value, state) {
  const trimmedValue = value.trim();

  return merge(state, {
    tasks:
      trimmedValue === ""
        ? deleteAtPath(state.editingValuePath)
        : setValueAtPath(state.editingValuePath, trimmedValue),

    editingValuePath: [],
  });
}

const actions = {
  tasks: {
    toggle: (path, tasks) => merge(tasks, setIsDoneAtPath(path, not)),

    delete: deleteAtPath,

    // eslint-disable-next-line no-magic-numbers
    moveUp: move(-1),

    moveDown: move(1),
  },

  setValue,

  setContent: (content, state) =>
    merge(state, {
      tasks: setContentAtPath(state.editingContentPath, content),
      editingContentPath: [],
    }),

  addTask: (ignore, state) => addNextTask([0, 0], state),

  deleteCurrentlyEditedTask: (ignore, state) => setValue("", state),

  addNextTask,

  addSubtask: (parentPath, state) =>
    merge(state, {
      tasks: setChildrenAtPath(parentPath, appendNewTask),

      editingValuePath: [
        ...parentPath,
        getAtPath(
          ["tasks", ...getFullPath(parentPath), "children", "length"],
          state
        ),
      ],
    }),
};

// eslint-disable-next-line import/no-unused-modules
export default actions;
