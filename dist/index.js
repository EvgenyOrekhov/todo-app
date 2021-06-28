import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

import React from "../_snowpack/pkg/react.js";
import { render } from "../_snowpack/pkg/react-dom.js";
import { actus, defaultActions, logger } from "../_snowpack/pkg/actus.js";
import merge from "../_snowpack/pkg/mergerino.js";
import { pipe, evolve } from "../_snowpack/pkg/ramda.js";
import App from "./App.js";
import actions from "./actions.js";
import { getTasksWithIds, getViewModel } from "./selectors.js";
actus([defaultActions({
  editingValuePath: [],
  editingContentPath: [],
  tasks: []
}), logger(), {
  state: {
    editingValuePath: [],
    editingContentPath: [],
    tasks: getTasksWithIds([{
      value: "default",
      children: [{
        value: "Create my first task",
        content: "",
        isDone: false,
        children: []
      }, {
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

<kbd>Shift + Down</kbd> - Move down

<kbd>Shift + Up</kbd> - Move up

## Editing task

<kbd>Enter</kbd> - Save

<kbd>Esc</kbd> - Cancel

<kbd>Tab</kbd> - Edit content

## Editing content

<kbd>Ctrl + Enter</kbd> - Save

<kbd>Esc</kbd> - Cancel`,
        isDone: false,
        children: []
      }]
    }])
  },
  actions,
  getNextState: merge,
  subscribers: [pipe(evolve({
    state: getViewModel
  }), ({
    state,
    actions: boundActions
  }) => {
    render( /*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(App, {
      actions: boundActions,
      state: state
    })), document.querySelector("#root"));
  })]
}]); // Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement

if (undefined /* [snowpack] import.meta.hot */ ) {
  undefined /* [snowpack] import.meta.hot */ .accept();
}