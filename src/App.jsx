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
                    if (
                      event.target.value.trim() === "" &&
                      children.length > 0
                    ) {
                      if (
                        window.confirm(
                          `Remove this task and and its ${
                            children.length
                          } subtask${children.length > 1 ? "s" : ""}?`
                        )
                      ) {
                        actions.setValue("");

                        return;
                      }

                      actions.editingValue.reset();

                      return;
                    }

                    actions.setValue(event.target.value);

                    return;
                  }

                  if (event.key === "Escape") {
                    if (value === "") {
                      actions.setValue("");

                      return;
                    }

                    actions.editingValue.reset();

                    return;
                  }
                }}
                autoFocus
              />
            ) : (
              <div
                className="clickable-value"
                tabIndex="0"
                onClick={() => actions.editingValue.set(id)}
              >
                <ReactMarkdown source={value} />
              </div>
            )}
          </div>
        </div>
        <ul className="tasks">{children.map(Task)}</ul>
        {equals(id, state.editingContent) ? (
          <textarea
            defaultValue={content}
            onBlur={(event) => actions.setContent(event.target.value)}
            onKeyDown={(event) => {
              if (event.ctrlKey && event.key === "Enter") {
                actions.setContent(event.target.value);

                return;
              }

              if (event.key === "Escape") {
                actions.editingContent.reset();

                return;
              }
            }}
            autoFocus
          />
        ) : (
          <div tabIndex="0" onClick={() => actions.editingContent.set(id)}>
            <ReactMarkdown source={content} />
          </div>
        )}
      </li>
    );
  }

  const tasksWithIds = getTasksWithIds(state.tasks);

  return (
    <>
      <button type="button" className="add-task" onClick={actions.addTask}>
        +
      </button>
      <ul className="tasks">{tasksWithIds[0].children.map(Task)}</ul>
    </>
  );
}

export default App;
