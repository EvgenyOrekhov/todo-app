import React from "react";
import ReactMarkdown from "react-markdown";
import { equals } from "ramda";

import ValueInput from "./ValueInput.jsx";
import { isSelectingText, handleDelete } from "./util.js";

function Value({ task, state, actions }) {
  const { value, children, path } = task;

  function handleDeleteClick() {
    handleDelete(children, () => actions.tasks.delete(path));
  }

  return (
    <div className="value">
      {equals(path, state.editingValuePath) ? (
        <ValueInput actions={actions} task={task} />
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
