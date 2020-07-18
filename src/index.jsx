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
                children: prepend({
                  value: "",
                  content: "",
                  isDone: false,
                  children: [],
                }),
              },
            },
          }),
          mergeLeft({ editingValue: [0, 0] })
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
