import React, { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import AceEditor from "react-ace";
import { equals } from "ramda";

import { getTasksWithPaths } from "./selectors.js";

/* eslint-disable import/no-unassigned-import */
import "ace-builds/src-noconflict/mode-markdown.js";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright.js";
import "./App.css";
/* eslint-enable */

function Task({ task, state, actions }) {
  const { value, content, isDone, children, path, id } = task;

  const taskReference = useRef();
  const [shouldScrollIntoView, setShouldScrollIntoView] = useState(false);

  useEffect(() => {
    if (shouldScrollIntoView) {
      taskReference.current.scrollIntoView(false);
      setShouldScrollIntoView(false);
    }
  }, [shouldScrollIntoView]);

  return (
    <li key={id} className={`${isDone ? "is-done" : ""}`}>
      <div
        ref={taskReference}
        className="task"
        tabIndex="0"
        onKeyDown={(event) => {
          if (
            state.editingValue.length !== 0 ||
            state.editingContent.length !== 0
          ) {
            return;
          }

          if (event.key === " ") {
            actions.tasks.toggle(path);

            event.preventDefault();

            return;
          }

          if (event.key === "Enter") {
            if (event.ctrlKey) {
              actions.addNextTask(path);

              return;
            }

            if (event.shiftKey) {
              actions.addSubtask(path);

              return;
            }

            actions.editingValue.set(path);

            return;
          }

          if (event.key === "Delete") {
            if (children.length !== 0) {
              if (
                window.confirm(
                  `Remove this task and and its ${children.length} subtask${
                    children.length > 1 ? "s" : ""
                  }?`
                )
              ) {
                actions.tasks.delete(path);

                return;
              }

              return;
            }

            actions.tasks.delete(path);
          }

          if (event.shiftKey) {
            if (event.key === "ArrowUp") {
              actions.tasks.moveUp(path);

              setShouldScrollIntoView(true);

              return;
            }

            if (event.key === "ArrowDown") {
              actions.tasks.moveDown(path);

              setShouldScrollIntoView(true);
            }
          }
        }}
      >
        <input
          type="checkbox"
          checked={isDone}
          tabIndex="-1"
          onChange={() => actions.tasks.toggle(path)}
        />
        <div className="value">
          {equals(path, state.editingValue) ? (
            <input
              defaultValue={value}
              onBlur={(event) => actions.setValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  if (
                    event.target.value.trim() === "" &&
                    children.length !== 0
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

                  if (event.target.value.trim() !== "") {
                    if (event.ctrlKey) {
                      actions.addNextTask(path);
                    }

                    if (event.shiftKey) {
                      actions.addSubtask(path);
                    }
                  }

                  return;
                }

                if (event.key === "Escape") {
                  if (value === "") {
                    actions.setValue("");

                    return;
                  }

                  actions.editingValue.reset();
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

                actions.editingValue.set(path);
              }}
            >
              <ReactMarkdown source={value} escapeHtml={false} />
            </div>
          )}
          <button
            type="button"
            className="delete"
            tabIndex="-1"
            onClick={() => {
              if (children.length !== 0) {
                if (
                  window.confirm(
                    `Remove this task and and its ${children.length} subtask${
                      children.length > 1 ? "s" : ""
                    }?`
                  )
                ) {
                  actions.tasks.delete(path);

                  return;
                }

                return;
              }

              actions.tasks.delete(path);
            }}
          >
            ✕
          </button>
        </div>
      </div>
      <ul className="tasks">
        {children.map((subtask) => (
          <Task
            task={subtask}
            state={state}
            actions={actions}
            key={subtask.id}
          />
        ))}
      </ul>
      <div
        tabIndex={
          equals(path, state.editingContent) ||
          (!content && !equals(path, state.editingValue))
            ? "-1"
            : "0"
        }
        onClick={() => {
          if (window.getSelection().type === "Range") {
            return;
          }

          if (state.editingContent.length !== 0) {
            return;
          }

          actions.editingContent.set(path);
        }}
        onFocus={() => {
          if (content === "" && state.editingContent.length === 0) {
            actions.editingContent.set(path);
          }
        }}
        onKeyDown={(event) => {
          if (state.editingContent.length !== 0) {
            return;
          }

          if (event.key === "Enter") {
            actions.editingContent.set(path);

            event.preventDefault();
          }
        }}
      >
        {equals(path, state.editingContent) ? (
          <AceEditor
            mode="markdown"
            theme="tomorrow_night_bright"
            className="editable-content"
            width="100%"
            height="100%"
            defaultValue={content}
            focus
            onFocus={(event, editor) => editor.navigateFileStart()}
            commands={[
              {
                name: "save",
                bindKey: { win: "Ctrl-Enter", mac: "Command-Enter" },

                exec(editor) {
                  actions.setContent(editor.getValue());
                },
              },
              {
                name: "cancel",
                bindKey: { win: "Escape", mac: "Escape" },

                exec() {
                  actions.editingContent.reset();
                },
              },
            ]}
            onBlur={(event, editor) => actions.setContent(editor.getValue())}
          />
        ) : (
          <div className="content">
            <ReactMarkdown source={content} escapeHtml={false} />
          </div>
        )}
      </div>
    </li>
  );
}

function App({ state, actions }) {
  const tasksWithPaths = getTasksWithPaths(state.tasks);

  return (
    <>
      <button type="button" className="add-task" onClick={actions.addTask}>
        ✚
      </button>
      <ul className="tasks">
        {tasksWithPaths[0].children.map((task) => (
          <Task task={task} state={state} actions={actions} key={task.id} />
        ))}
      </ul>
    </>
  );
}

export default App;
