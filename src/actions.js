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
  move,
} from "ramda";
import { v4 as uuidv4 } from "uuid";

const getFullPath = pipe(intersperse("children"), map(String));

const getFullPathToSiblings = pipe(init, getFullPath, append("children"));

function setAtPath(path, value) {
  return assocPath(path, value, {});
}

function deleteAtPath(path) {
  return setAtPath(getFullPath(path), undefined);
}

function moveTask(indexShift) {
  return (path, tasks) => {
    const currentIndex = last(path);
    const newIndex = currentIndex + indexShift;
    const fullPathToSiblings = getFullPathToSiblings(path);
    const siblings = getAtPath(fullPathToSiblings, tasks);

    if (newIndex < 0 || newIndex >= siblings.length) {
      return tasks;
    }

    return setAtPath(fullPathToSiblings, move(currentIndex, newIndex));
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
  return {
    tasks: setAtPath(getFullPathToSiblings(parentPath), appendNewTask),

    editingValuePath: [
      ...init(parentPath),
      getAtPath(
        ["tasks", ...getFullPathToSiblings(parentPath), "length"],
        state
      ),
    ],
  };
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

  return {
    tasks:
      trimmedValue === ""
        ? deleteAtPath(state.editingValuePath)
        : setValueAtPath(state.editingValuePath, trimmedValue),

    editingValuePath: [],
  };
}

const actions = {
  tasks: {
    toggle: (path) => setIsDoneAtPath(path, not),

    delete: deleteAtPath,

    // eslint-disable-next-line no-magic-numbers
    moveUp: moveTask(-1),

    moveDown: moveTask(1),
  },

  setValue,

  setContent: (content, state) => ({
    tasks: setContentAtPath(state.editingContentPath, content),
    editingContentPath: [],
  }),

  addTask: (ignore, state) => addNextTask([0, 0], state),

  deleteCurrentlyEditedTask: (ignore, state) => setValue("", state),

  addNextTask,

  addSubtask: (parentPath, state) => ({
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

export default actions;
