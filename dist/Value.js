import React, { useCallback } from "../_snowpack/pkg/react.js";
import ReactMarkdown from "../_snowpack/pkg/react-markdown.js";
import rehypeRaw from "../_snowpack/pkg/rehype-raw.js";
import rehypeSanitize from "../_snowpack/pkg/rehype-sanitize.js";
import { isSelectingText, confirmRemoval, handleDelete } from "./util.js";
import makeKeyDownHandler from "./makeKeyDownHandler.js";
const rehypePlugins = [rehypeRaw, rehypeSanitize];
export default function Value({
  task,
  actions
}) {
  const {
    value,
    children,
    path,
    isEditingValue
  } = task;

  function handleEnterKey(event) {
    if (event.target.value.trim() !== "") {
      actions.setValue(event.target.value);
      return;
    }

    if (children.length > 0) {
      confirmRemoval(children, actions.deleteCurrentlyEditedTask, actions.editingValuePath.reset);
      return;
    }

    actions.deleteCurrentlyEditedTask();
  }

  const handleKeyDown = makeKeyDownHandler({
    Enter: handleEnterKey,
    "Ctrl + Enter": event => {
      handleEnterKey(event);

      if (event.target.value.trim() !== "") {
        actions.addNextTask(path);
      }
    },
    "Shift + Enter": event => {
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
    }
  });

  function handleValueClick() {
    if (!isSelectingText()) {
      actions.editingValuePath.set(path);
    }
  }

  function handleDeleteClick() {
    handleDelete(children, () => actions.tasks.delete(path));
  }

  const handleBlur = useCallback(event => actions.setValue(event.target.value), [actions]);
  return /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, isEditingValue ? /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    defaultValue: value,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown
  }) :
  /*#__PURE__*/
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus -- key events and focus are handled by the parent
  React.createElement("div", {
    className: "clickable-value",
    onClick: handleValueClick,
    role: "button"
  }, /*#__PURE__*/React.createElement(ReactMarkdown, {
    rehypePlugins: rehypePlugins
  }, value)), /*#__PURE__*/React.createElement("button", {
    className: "delete",
    onClick: handleDeleteClick,
    tabIndex: "-1",
    type: "button"
  }, "\u2715"));
}