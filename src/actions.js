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
  insert,
  evolve,
  slice,
  update,
  dec,
  adjust,
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
  return ({ state: tasks, payload: path }) => {
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

function addNextTask({ state, payload: parentPath }) {
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

function setValue({ state, payload }) {
  const trimmedValue = payload.trim();

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
    toggle: ({ payload: path }) => setIsDoneAtPath(path, not),

    delete: ({ payload: path }) => deleteAtPath(path),

    // eslint-disable-next-line no-magic-numbers
    moveUp: moveTask(-1),

    moveDown: moveTask(1),

    moveLeft({ state: tasks, payload: path }) {
      // eslint-disable-next-line no-magic-numbers
      if (path.length < 3) {
        return tasks;
      }

      const fullPathToParentSiblings = pipe(init, getFullPathToSiblings)(path);
      const task = getAtPath(getFullPath(path), tasks);
      const newIndex = last(init(path)) + 1;
      const fullPathToSiblings = getFullPathToSiblings(path);
      const siblings = getAtPath(fullPathToSiblings, tasks);
      const followingSiblings = siblings.slice(last(path) + 1);
      const taskWithNewChildren = {
        ...task,
        children: task.children.concat(followingSiblings),
      };

      return [
        deleteAtPath(path),
        setAtPath(fullPathToSiblings, slice(0, last(path))),
        setAtPath(
          fullPathToParentSiblings,
          insert(newIndex, taskWithNewChildren)
        ),
      ];
    },

    moveRight({ state: tasks, payload: path }) {
      if (last(path) === 0) {
        return tasks;
      }

      const pathToPreviousSibling = adjust(path.length - 1, dec, path);
      const task = getAtPath(getFullPath(path), tasks);
      const taskWithoutChildren = { ...task, children: [] };
      const fullPathToSiblings = getFullPathToSiblings(path);
      const siblings = getAtPath(fullPathToSiblings, tasks);
      const previousSibling = siblings[last(path) - 1];
      const previousSiblingWithNewChildren = evolve(
        { children: append(taskWithoutChildren) },
        previousSibling
      );

      return [
        deleteAtPath(path),
        setAtPath(
          fullPathToSiblings,
          update(last(path) - 1, previousSiblingWithNewChildren)
        ),
        setAtPath(
          [...getFullPath(pathToPreviousSibling), "children"],
          (previousSiblingChildren) =>
            previousSiblingChildren.concat(task.children)
        ),
      ];
    },
  },

  setValue,

  setContent: ({ state, payload }) => ({
    tasks: setContentAtPath(state.editingContentPath, payload),
    editingContentPath: [],
  }),

  addTask: ({ state }) => addNextTask({ state, payload: [0, 0] }),

  deleteCurrentlyEditedTask: ({ state }) => setValue({ state, payload: "" }),

  addNextTask,

  addSubtask: ({ state, payload: parentPath }) => ({
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
