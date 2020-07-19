import React from "react";
import ReactMarkdown from "react-markdown";
import AceEditor from "react-ace";
import { equals } from "ramda";

import { getTasksWithIds } from "./selectors";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright";
import "./App.css";

function App({ state, actions }) {
  function Task({ value, content, isDone, children, id, uniqueId }) {
    const key = id.join("-");

    return (
      <li key={uniqueId} className={`${isDone ? "is-done" : ""}`}>
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
              if (event.ctrlKey) {
                actions.addNextTask(id);

                return;
              }

              if (event.shiftKey) {
                actions.addSubtask(id);

                return;
              }

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

            if (event.shiftKey) {
              if (event.key === "ArrowUp") {
                actions.moveUp(id);

                return;
              }

              if (event.key === "ArrowDown") {
                actions.moveDown(id);

                return;
              }
            }
          }}
        >
          <input
            type="checkbox"
            checked={isDone}
            tabIndex="-1"
            onChange={() => actions.toggleTask(id)}
          />
          <div className="value">
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

                    if (event.ctrlKey) {
                      actions.addNextTask(id);
                    }

                    if (event.shiftKey) {
                      actions.addSubtask(id);
                    }

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
                <ReactMarkdown source={value} escapeHtml={false} />
              </div>
            )}
            <button
              type="button"
              className="delete"
              tabIndex="-1"
              onClick={() => {
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
              }}
            >
              ✕
            </button>
          </div>
        </div>
        <ul className="tasks">{children.map(Task)}</ul>
        <div
          tabIndex={
            equals(id, state.editingContent) ||
            (!content && !equals(id, state.editingValue))
              ? "-1"
              : "0"
          }
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
                  exec: function (editor) {
                    actions.setContent(editor.getValue());
                  },
                },
                {
                  name: "cancel",
                  bindKey: { win: "Escape", mac: "Escape" },
                  exec: function (editor) {
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

  const tasksWithIds = getTasksWithIds(state.tasks);

  return (
    <>
      <button type="button" className="add-task" onClick={actions.addTask}>
        ✚
      </button>
      <ul className="tasks">{tasksWithIds[0].children.map(Task)}</ul>
    </>
  );
}

export default App;
