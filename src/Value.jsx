import React, { useCallback } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

import { isSelectingText, confirmRemoval, handleDelete } from "./util.js";
import makeKeyDownHandler from "./makeKeyDownHandler.js";

export default function Value({ task, actions }) {
  const { value, children, path, isEditingValue } = task;

  function handleEnterKey(event) {
    if (event.target.value.trim() !== "") {
      actions.setValue(event.target.value);

      return;
    }

    if (children.length > 0) {
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

  function handleValueClick() {
    if (!isSelectingText()) {
      actions.editingValuePath.set(path);
    }
  }

  function handleDeleteClick() {
    handleDelete(children, () => actions.tasks.delete(path));
  }

  const handleBlur = useCallback(
    (event) => actions.setValue(event.target.value),
    [actions]
  );

  return (
    <div className="value">
      {isEditingValue ? (
        <input
          autoFocus
          defaultValue={value}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus -- key events and focus are handled by the parent
        <div
          className="clickable-value"
          onClick={handleValueClick}
          role="button"
        >
          <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
            {value}
          </ReactMarkdown>
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
