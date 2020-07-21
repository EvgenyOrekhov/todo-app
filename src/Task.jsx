import React, { useRef, useEffect, useState } from "react";

import Value from "./Value.jsx";
import Content from "./Content.jsx";
import { handleDelete } from "./util.js";

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

function Task({ task, state, actions }) {
  const { isDone, children, path, id } = task;

  const [reference, setShouldScrollIntoView] = useScrollIntoView();

  function handleSpaceKey(event) {
    event.preventDefault();

    actions.tasks.toggle(path);
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

        setShouldScrollIntoView();

        return;
      }

      if (event.key === "ArrowDown") {
        actions.tasks.moveDown(path);

        setShouldScrollIntoView();
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
    <li className={`${isDone ? "is-done" : ""}`} key={id}>
      <div
        className="task"
        onKeyDown={handleKeyDown}
        ref={reference}
        role="button"
        tabIndex="0"
      >
        <input
          checked={isDone}
          onChange={() => actions.tasks.toggle(path)}
          tabIndex="-1"
          type="checkbox"
        />
        <Value actions={actions} state={state} task={task} />
      </div>
      <ul className="tasks">
        {children.map((subtask) => (
          <Task
            actions={actions}
            key={subtask.id}
            state={state}
            task={subtask}
          />
        ))}
      </ul>
      <Content actions={actions} state={state} task={task} />
    </li>
  );
}

export default Task;
