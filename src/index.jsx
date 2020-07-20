import React from "react";
import ReactDOM from "react-dom";
import { init as initializeActus } from "actus";
import defaultActions from "actus-default-actions";
import logger from "actus-logger";
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

import App from "./App.jsx";
import { getTasksWithids } from "./selectors.js";

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

initializeActus([
  defaultActions({
    editingValuePath: [],
    editingContentPath: [],
    tasks: {},
  }),
  logger(),
  {
    state: {
      editingValuePath: [],
      editingContentPath: [],

      tasks: getTasksWithids([
        {
          value: "default",

          children: [
            {
              value: "Create my first task",
              content: "",
              isDone: false,
              children: [],
            },
            {
              value: "Learn keyboard shortcuts",
              content: `## General

<kbd>Tab</kbd> - focus next element

<kbd>Shift + Tab</kbd> - focus previous element

## Focused task

<kbd>Space</kbd> - Mark as done

<kbd>Enter</kbd> - Edit task

<kbd>Ctrl + Enter</kbd> - Add new sibling task

<kbd>Shift + Enter</kbd> - Add new subtask

<kbd>Delete</kbd> - Delete task

## Editing task

<kbd>Enter</kbd> - Save

<kbd>Esc</kbd> - Cancel

<kbd>Tab</kbd> - Edit content

## Editing content

<kbd>Ctrl + Enter</kbd> - Save

<kbd>Esc</kbd> - Cancel`,
              isDone: false,
              children: [],
            },
          ],
        },
      ]),
    },

    actions: {
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
    },

    subscribers: [
      ({ state, actions }) => {
        ReactDOM.render(
          <React.StrictMode>
            <App actions={actions} state={state} />
          </React.StrictMode>,
          document.querySelector("#root")
        );
      },
    ],
  },
]);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
