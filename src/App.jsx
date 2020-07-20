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

function isSelectingText() {
  return window.getSelection().type === "Range";
}

function confirmRemoval(children, onConfirm, onCancel) {
  if (
    window.confirm(
      `Remove this task and and its ${children.length} subtask${
        children.length > 1 ? "s" : ""
      }?`
    )
  ) {
    onConfirm();

    return;
  }

  if (onCancel) {
    onCancel();
  }
}

function handleDelete(children, callback) {
  if (children.length !== 0) {
    confirmRemoval(children, callback);

    return;
  }

  callback();
}

function Value({ task, state, actions }) {
  const { value, children, path } = task;

  function handleEnterKey(event) {
    if (event.target.value.trim() === "" && children.length !== 0) {
      confirmRemoval(
        children,
        () => actions.setValue(""),
        actions.editingValuePath.reset
      );

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
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleEnterKey(event);

      return;
    }

    if (event.key === "Escape") {
      if (value === "") {
        actions.setValue("");

        return;
      }

      actions.editingValuePath.reset();
    }
  }

  function handleDeleteClick() {
    handleDelete(children, () => actions.tasks.delete(path));
  }

  return (
    <div className="value">
      {equals(path, state.editingValuePath) ? (
        <input
          defaultValue={value}
          onBlur={(event) => actions.setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div
          className="clickable-value"
          onClick={() =>
            !isSelectingText() && actions.editingValuePath.set(path)
          }
        >
          <ReactMarkdown source={value} escapeHtml={false} />
        </div>
      )}
      <button
        type="button"
        className="delete"
        tabIndex="-1"
        onClick={handleDeleteClick}
      >
        ✕
      </button>
    </div>
  );
}

function Content({ task, state, actions }) {
  const { content, path } = task;

  function handleContentClick() {
    if (window.getSelection().type === "Range") {
      return;
    }

    if (state.editingContentPath.length !== 0) {
      return;
    }

    actions.editingContentPath.set(path);
  }

  function handleContentFocus() {
    if (content === "" && state.editingContentPath.length === 0) {
      actions.editingContentPath.set(path);
    }
  }

  function handleContentKeyDown(event) {
    if (state.editingContentPath.length !== 0) {
      return;
    }

    if (event.key === "Enter") {
      actions.editingContentPath.set(path);

      event.preventDefault();
    }
  }

  return (
    <div
      tabIndex={
        equals(path, state.editingContentPath) ||
        (!content && !equals(path, state.editingValuePath))
          ? "-1"
          : "0"
      }
      onClick={handleContentClick}
      onFocus={handleContentFocus}
      onKeyDown={handleContentKeyDown}
    >
      {equals(path, state.editingContentPath) ? (
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
                actions.editingContentPath.reset();
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
  );
}

function Task({ task, state, actions }) {
  const { isDone, children, path, id } = task;

  const taskReference = useRef();
  const [shouldScrollIntoView, setShouldScrollIntoView] = useState(false);

  useEffect(() => {
    if (shouldScrollIntoView) {
      taskReference.current.scrollIntoView(false);
      setShouldScrollIntoView(false);
    }
  }, [shouldScrollIntoView]);

  function handleSpaceKey(event) {
    actions.tasks.toggle(path);

    event.preventDefault();
  }

  function handleEnterKey(event) {
    if (event.ctrlKey) {
      actions.addNextTask(path);

      return;
    }

    if (event.shiftKey) {
      actions.addSubtask(path);

      return;
    }

    actions.editingValuePath.set(path);
  }

  function handleDeleteKey() {
    handleDelete(children, () => actions.tasks.delete(path));
  }

  function handleArrowKeys(event) {
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
  }

  // eslint-disable-next-line max-statements
  function handleKeyDown(event) {
    if (
      state.editingValuePath.length !== 0 ||
      state.editingContentPath.length !== 0
    ) {
      return;
    }

    if (event.key === " ") {
      handleSpaceKey(event);

      return;
    }

    if (event.key === "Enter") {
      handleEnterKey(event);

      return;
    }

    if (event.key === "Delete") {
      handleDeleteKey();

      return;
    }

    handleArrowKeys(event);
  }

  return (
    <li key={id} className={`${isDone ? "is-done" : ""}`}>
      <div
        ref={taskReference}
        className="task"
        tabIndex="0"
        onKeyDown={handleKeyDown}
      >
        <input
          type="checkbox"
          checked={isDone}
          tabIndex="-1"
          onChange={() => actions.tasks.toggle(path)}
        />
        <Value task={task} state={state} actions={actions} />
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
      <Content task={task} state={state} actions={actions} />
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
