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
  prepend,
  evolve,
  init,
  last,
  remove,
  append,
  view,
} from "ramda";

import App from "./App";

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
      tasks: [
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
      ],
    },
    actions: {
      toggleTask: (id, state) =>
        over(
          lensPath(["tasks", ...intersperse("children", id), "isDone"]),
          not,
          state
        ),
      setValue: (value, state) => {
        const trimmedValue = value.trim();

        if (trimmedValue === "") {
          return pipe(
            over(
              lensPath([
                "tasks",
                ...intersperse("children", init(state.editingValue)),
                "children",
              ]),
              remove(last(state.editingValue), 1)
            ),
            mergeLeft({ editingValue: [] })
          )(state);
        }

        return pipe(
          set(
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
              0: {
                children: append({
                  value: "",
                  content: "",
                  isDone: false,
                  children: [],
                }),
              },
            },
          }),
          mergeLeft({ editingValue: [0, state.tasks[0].children.length] })
        )(state),
      addNextTask: (parentId, state) =>
        pipe(
          over(
            lensPath([
              "tasks",
              ...intersperse("children", init(parentId)),
              "children",
            ]),
            append({
              value: "",
              content: "",
              isDone: false,
              children: [],
            })
          ),
          mergeLeft({
            editingValue: [
              ...init(parentId),
              view(
                lensPath([
                  "tasks",
                  ...intersperse("children", init(parentId)),
                  "children",
                  "length",
                ]),
                state
              ),
            ],
          })
        )(state),
      addSubtask: (parentId, state) =>
        pipe(
          over(
            lensPath([
              "tasks",
              ...intersperse("children", parentId),
              "children",
            ]),
            append({
              value: "",
              content: "",
              isDone: false,
              children: [],
            })
          ),
          mergeLeft({
            editingValue: [
              ...parentId,
              view(
                lensPath([
                  "tasks",
                  ...intersperse("children", parentId),
                  "children",
                  "length",
                ]),
                state
              ),
            ],
          })
        )(state),
      deleteTask: (id, state) =>
        over(
          lensPath(["tasks", ...intersperse("children", init(id)), "children"]),
          remove(last(id), 1),
          state
        ),
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
