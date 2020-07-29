import React from "react";

import Task from "./Task.jsx";

/* eslint-disable import/no-unassigned-import */
import "ace-builds/src-noconflict/mode-markdown.js";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright.js";
import "./App.css";
/* eslint-enable */

export default function App({ state, actions }) {
  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <button className="add-task" onClick={actions.addTask} type="button">
        ✚
      </button>
      <ul className="tasks">
        {state.tasks[0].children.map((task) => (
          <Task actions={actions} key={task.id} state={state} task={task} />
        ))}
      </ul>
    </>
  );
}
