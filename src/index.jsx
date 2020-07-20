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
  evolve,
  init,
  last,
  remove,
  append,
  view,
  path as getByPath,
} from "ramda";
import { v4 as uuidv4 } from "uuid";

import App from "./App.jsx";
import { getTasksWithids } from "./selectors.js";

function makeTask() {
  return {
    id: uuidv4(),
    value: "",
    content: "",
    isDone: false,
    children: [],
  };
}

initializeActus([
  defaultActions({
    editingValue: [],
    editingContent: [],
    tasks: {},
  }),
  logger(),
  {
    state: {
      editingValue: [],
      editingContent: [],

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
        toggle: (path) =>
          over(lensPath([...intersperse("children", path), "isDone"]), not),

        delete: (path) =>
          over(
            lensPath([...intersperse("children", init(path)), "children"]),
            remove(last(path), 1)
          ),

        moveUp: (path, tasks) => {
          if (last(path) === 0) {
            return tasks;
          }

          const taskPath = intersperse("children", path);
          const previousTaskPath = [...init(taskPath), last(taskPath) - 1];

          const task = getByPath(taskPath, tasks);
          const previousTask = getByPath(previousTaskPath, tasks);

          return pipe(
            set(lensPath(previousTaskPath), task),
            set(lensPath(taskPath), previousTask)
          )(tasks);
        },

        moveDown: (path, tasks) => {
          const parentTask = getByPath(
            intersperse("children", init(path)),
            tasks
          );

          if (last(path) === parentTask.children.length - 1) {
            return tasks;
          }

          const taskPath = intersperse("children", path);
          const nextTaskPath = [...init(taskPath), last(taskPath) + 1];

          const task = getByPath(taskPath, tasks);
          const nextTask = getByPath(nextTaskPath, tasks);

          return pipe(
            set(lensPath(nextTaskPath), task),
            set(lensPath(taskPath), nextTask)
          )(tasks);
        },
      },

      setValue: (value, state) => {
        const trimmedValue = value.trim();

        return pipe(
          trimmedValue === ""
            ? over(
                lensPath([
                  "tasks",
                  ...intersperse("children", init(state.editingValue)),
                  "children",
                ]),
                remove(last(state.editingValue), 1)
              )
            : set(
                lensPath([
                  "tasks",
                  ...intersperse("children", state.editingValue),
                  "value",
                ]),
                trimmedValue
              ),
          mergeLeft({ editingValue: [] })
        )(state);
      },

      setContent: (content, state) =>
        pipe(
          set(
            lensPath([
              "tasks",
              ...intersperse("children", state.editingContent),
              "content",
            ]),
            content.trim()
          ),
          mergeLeft({ editingContent: [] })
        )(state),

      addTask: (ignore, state) =>
        pipe(
          evolve({
            tasks: {
              "0": {
                children: append(makeTask()),
              },
            },
          }),
          mergeLeft({ editingValue: [0, state.tasks[0].children.length] })
        )(state),

      addNextTask: (parentPath, state) =>
        pipe(
          over(
            lensPath([
              "tasks",
              ...intersperse("children", init(parentPath)),
              "children",
            ]),
            append(makeTask())
          ),
          mergeLeft({
            editingValue: [
              ...init(parentPath),
              view(
                lensPath([
                  "tasks",
                  ...intersperse("children", init(parentPath)),
                  "children",
                  "length",
                ]),
                state
              ),
            ],
          })
        )(state),

      addSubtask: (parentPath, state) =>
        pipe(
          over(
            lensPath([
              "tasks",
              ...intersperse("children", parentPath),
              "children",
            ]),
            append(makeTask())
          ),
          mergeLeft({
            editingValue: [
              ...parentPath,
              view(
                lensPath([
                  "tasks",
                  ...intersperse("children", parentPath),
                  "children",
                  "length",
                ]),
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
            <App state={state} actions={actions} />
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
