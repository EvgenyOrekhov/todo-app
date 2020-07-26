import React from "react";
import ReactMarkdown from "react-markdown";
import { equals } from "ramda";

import { isSelectingText, confirmRemoval, handleDelete } from "./util.js";
import makeKeyDownHandler from "./makeKeyDownHandler.js";

function Value({ task, state, actions }) {
  const { value, children, path } = task;

  function handleEnterKey(event) {
    if (event.target.value.trim() !== "") {
      actions.setValue(event.target.value);

      return;
    }

    if (children.length !== 0) {
      confirmRemoval(
        children,
        actions.deleteCurrentlyEditedTask,
        actions.editingValuePath.reset
      );

      return;
    }

    actions.deleteCurrentlyEditedTask();
  }

  const handleKeyDown = makeKeyDownHandler({
    Enter: handleEnterKey,

    "Ctrl + Enter": (event) => {
      handleEnterKey(event);

      if (event.target.value.trim() !== "") {
        actions.addNextTask(path);
      }
    },

    "Shift + Enter": (event) => {
      handleEnterKey(event);

      if (event.target.value.trim() !== "") {
        actions.addSubtask(path);
      }
    },

    Escape: () => {
      if (value === "") {
        actions.deleteCurrentlyEditedTask();

        return;
      }

      actions.editingValuePath.reset();
    },
  });

  function handleDeleteClick() {
    handleDelete(children, () => actions.tasks.delete(path));
  }

  return (
    <div className="value">
      {equals(path, state.editingValuePath) ? (
        <input
          autoFocus
          defaultValue={value}
          onBlur={(event) => actions.setValue(event.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus -- key events and focus are handled by the parent
        <div
          className="clickable-value"
          onClick={() =>
            !isSelectingText() && actions.editingValuePath.set(path)
          }
          role="button"
        >
          <ReactMarkdown escapeHtml={false} source={value} />
        </div>
      )}
      <button
        className="delete"
        onClick={handleDeleteClick}
        tabIndex="-1"
        type="button"
      >
        ✕
      </button>
    </div>
  );
}

export default Value;
