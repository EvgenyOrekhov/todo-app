import React from "react";
import ReactDOM from "react-dom";
import { init } from "actus";
import defaultActions from "actus-default-actions";
import logger from "actus-logger";
import { over, set, not, lensPath, intersperse, pipe, mergeLeft } from "ramda";

import App from "./App";

init([
  defaultActions({
    editingValue: [],
    tasks: {},
  }),
  logger(),
  {
    state: {
      editingValue: [],
      tasks: [
        {
          value: "default",
          children: [
            {
              value: "Rambo",
              content: "",
              isDone: false,
              children: [
                {
                  value: "Rambo: Last Blood",
                  content: `> line 1
> line 2

## Header

Text text text text`,
                  isDone: false,
                  children: [],
                },
                {
                  value: "Rambo: First Blood",
                  content: "",
                  isDone: true,
                  children: [],
                },
              ],
            },
            {
              value: "Frozen",
              content: "",
              isDone: true,
              children: [],
            },
            {
              value: "https://google.com",
              content: "```js\nconsole.log(123);\n```",
              isDone: true,
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
      setValue: (value, state) =>
        pipe(
          set(
            lensPath([
              "tasks",
              ...intersperse("children", state.editingValue),
              "value",
            ]),
            value
          ),
          mergeLeft({ editingValue: [] })
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
