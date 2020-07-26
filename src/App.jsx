import React from "react";

import Task from "./Task.jsx";
import { getViewModel } from "./selectors.js";

/* eslint-disable import/no-unassigned-import */
import "ace-builds/src-noconflict/mode-markdown.js";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright.js";
import "./App.css";
/* eslint-enable */

export default function App({ state, actions }) {
  const viewModel = getViewModel(state);

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <button className="add-task" onClick={actions.addTask} type="button">
        ✚
      </button>
      <ul className="tasks">
        {viewModel.tasks[0].children.map((task) => (
          <Task actions={actions} key={task.id} state={viewModel} task={task} />
        ))}
      </ul>
    </>
  );
}
