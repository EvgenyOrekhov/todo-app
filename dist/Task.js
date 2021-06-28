import React, { useRef, useEffect, useState, useCallback } from "../_snowpack/pkg/react.js";
import Value from "./Value.js";
import Content from "./Content.js";
import { handleDelete } from "./util.js";
import makeKeyDownHandler from "./makeKeyDownHandler.js";

function useScrollIntoView() {
  const reference = useRef();
  const [shouldScrollIntoView, setShouldScrollIntoView] = useState(false);
  useEffect(() => {
    if (shouldScrollIntoView) {
      reference.current.scrollIntoView(false);
      setShouldScrollIntoView(false);
    }
  }, [shouldScrollIntoView]);
  return [reference, () => setShouldScrollIntoView(true)];
}

export default function Task({
  task,
  state,
  actions
}) {
  const {
    isDone,
    children,
    path,
    id
  } = task;
  const [reference, setShouldScrollIntoView] = useScrollIntoView();
  const handleKeyDown = makeKeyDownHandler({
    Space: event => {
      event.preventDefault();
      actions.tasks.toggle(path);
    },
    "Ctrl + Enter": () => actions.addNextTask(path),
    "Shift + Enter": () => actions.addSubtask(path),
    Enter: () => actions.editingValuePath.set(path),
    Delete: () => handleDelete(children, () => actions.tasks.delete(path)),
    "Shift + Up": () => {
      actions.tasks.moveUp(path);
      setShouldScrollIntoView();
    },
    "Shift + Down": () => {
      actions.tasks.moveDown(path);
      setShouldScrollIntoView();
    }
  });
  const handleChange = useCallback(() => actions.tasks.toggle(path), [actions, path]);
  return /*#__PURE__*/React.createElement("li", {
    className: isDone ? "is-done" : "",
    key: id
  }, /*#__PURE__*/React.createElement("div", {
    className: "task",
    onKeyDown: state.isEditingValue || state.isEditingContent ? undefined : handleKeyDown,
    ref: reference,
    role: "button",
    tabIndex: "0"
  }, /*#__PURE__*/React.createElement("input", {
    checked: isDone,
    onChange: handleChange,
    tabIndex: "-1",
    type: "checkbox"
  }), /*#__PURE__*/React.createElement(Value, {
    actions: actions,
    task: task
  })), /*#__PURE__*/React.createElement(Content, {
    actions: actions,
    state: state,
    task: task
  }), /*#__PURE__*/React.createElement("ul", {
    className: "tasks"
  }, children.map(subtask => /*#__PURE__*/React.createElement(Task, {
    actions: actions,
    key: subtask.id,
    state: state,
    task: subtask
  }))));
}