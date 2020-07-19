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
        <div
          className="task"
          tabIndex="0"
          onKeyDown={(event) => {
            if (
              state.editingValue.length > 0 ||
              state.editingContent.length > 0
            ) {
              return;
            }

            if (event.key === " ") {
              actions.toggleTask(id);

              event.preventDefault();

              return;
            }

            if (event.key === "Enter") {
              actions.editingValue.set(id);

              return;
            }

            if (event.key === "Delete") {
              if (children.length > 0) {
                if (
                  window.confirm(
                    `Remove this task and and its ${children.length} subtask${
                      children.length > 1 ? "s" : ""
                    }?`
                  )
                ) {
                  actions.deleteTask(id);

                  return;
                }

                return;
              }

              actions.deleteTask(id);
            }
          }}
        >
          <input
            type="checkbox"
            checked={isDone}
            tabIndex="-1"
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
                onClick={() => {
                  if (window.getSelection().type === "Range") {
                    return;
                  }

                  actions.editingValue.set(id);
                }}
              >
                <ReactMarkdown source={value} />
              </div>
            )}
          </div>
        </div>
        <ul className="tasks">{children.map(Task)}</ul>
        <div
          tabIndex={equals(id, state.editingContent) ? "-1" : "0"}
          onClick={() => {
            if (window.getSelection().type === "Range") {
              return;
            }

            if (state.editingContent.length > 0) {
              return;
            }

            actions.editingContent.set(id);
          }}
          onFocus={() => {
            if (content === "" && state.editingContent.length === 0) {
              actions.editingContent.set(id);
            }
          }}
          onKeyDown={(event) => {
            if (state.editingContent.length > 0) {
              return;
            }

            if (event.key === "Enter") {
              actions.editingContent.set(id);

              event.preventDefault();

              return;
            }
          }}
        >
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
            <div>
              <ReactMarkdown source={content} />
            </div>
          )}
        </div>
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
