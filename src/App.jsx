import React from "react";

import Task from "./Task.jsx";
import { getTasksWithPaths } from "./selectors.js";

/* eslint-disable import/no-unassigned-import */
import "ace-builds/src-noconflict/mode-markdown.js";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright.js";
import "./App.css";
/* eslint-enable */

function App({ state, actions }) {
  const tasksWithPaths = getTasksWithPaths(state.tasks);

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <button className="add-task" onClick={actions.addTask} type="button">
        ✚
      </button>
      <ul className="tasks">
        {tasksWithPaths[0].children.map((task) => (
          <Task actions={actions} key={task.id} state={state} task={task} />
        ))}
      </ul>
    </>
  );
}

export default App;
