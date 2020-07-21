import React from "react";
import { render } from "react-dom";
import { init } from "actus";
import defaultActions from "actus-default-actions";
import logger from "actus-logger";

import App from "./App.jsx";
import actions from "./actions.js";
import { getTasksWithIds } from "./selectors.js";

init([
  defaultActions({
    editingValuePath: [],
    editingContentPath: [],
    tasks: [],
  }),
  logger(),
  {
    state: {
      editingValuePath: [],
      editingContentPath: [],

      tasks: getTasksWithIds([
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

    actions,

    subscribers: [
      ({ state, actions: boundActions }) => {
        render(
          <React.StrictMode>
            <App actions={boundActions} state={state} />
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
