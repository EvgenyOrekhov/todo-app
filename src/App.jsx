import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { equals } from "ramda";

import { getTasksWithIds } from "./selectors";

import "./App.css";

function App({ state, actions }) {
  function Task({ value, content, isDone, children, id }) {
    const key = id.join("-");

    return (
      <li key={key}>
        <div className="task">
          <input
            type="checkbox"
            checked={isDone}
            onChange={() => actions.toggleTask(id)}
          />
          <div className={`value ${isDone ? "is-done" : ""}`}>
            {equals(id, state.editingValue) ? (
              <input
                defaultValue={value}
                onBlur={(event) => actions.setValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    actions.setValue(event.target.value);

                    return;
                  }

                  if (event.key === "Escape") {
                    actions.editingValue.reset();

                    return;
                  }
                }}
                autoFocus
              />
            ) : (
              <div
                className="clickable-value"
                onClick={() => actions.editingValue.set(id)}
              >
                <ReactMarkdown source={value} />
              </div>
            )}
          </div>
        </div>
        <ul>{children.map(Task)}</ul>
        <ReactMarkdown source={content} />
      </li>
    );
  }

  const tasksWithIds = getTasksWithIds(state.tasks);

  return <ul>{tasksWithIds[0].children.map(Task)}</ul>;
}

export default App;
