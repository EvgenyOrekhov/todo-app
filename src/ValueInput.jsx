import React from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { confirmRemoval } from "./util.js";

export default function ValueInput({ task, actions }) {
  const { value, children, path } = task;

  function handleSave(event) {
    actions.setValue(event.target.value);

    if (event.ctrlKey) {
      actions.addNextTask(path);

      return;
    }

    if (event.shiftKey) {
      actions.addSubtask(path);
    }
  }

  function handleEnterKey(event) {
    if (event.target.value.trim() !== "") {
      handleSave(event);

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

  function handleEscapeKey() {
    if (value === "") {
      actions.deleteCurrentlyEditedTask();

      return;
    }

    actions.editingValuePath.reset();
  }

  useHotkeys("enter, ctrl+enter, shift+enter", handleEnterKey, {
    enableOnTags: ["INPUT"],
  });

  useHotkeys("escape", handleEscapeKey, { enableOnTags: ["INPUT"] });

  return (
    <input
      autoFocus
      defaultValue={value}
      onBlur={(event) => actions.setValue(event.target.value)}
    />
  );
}
