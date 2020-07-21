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

// eslint-disable-next-line import/no-unused-modules
export { isSelectingText, confirmRemoval, handleDelete };
