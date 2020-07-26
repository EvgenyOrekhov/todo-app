import React, { useRef, useEffect, useState } from "react";

import Value from "./Value.jsx";
import Content from "./Content.jsx";
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

export default function Task({ task, state, actions }) {
  const { isDone, children, path, id } = task;

  const [reference, setShouldScrollIntoView] = useScrollIntoView();

  const handleKeyDown = makeKeyDownHandler({
    Space: (event) => {
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
    },
  });

  return (
    <li className={`${isDone ? "is-done" : ""}`} key={id}>
      <div
        className="task"
        onKeyDown={
          state.isEditingValue || state.isEditingContent
            ? undefined
            : handleKeyDown
        }
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
        <Value actions={actions} task={task} />
      </div>
      <Content actions={actions} state={state} task={task} />
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
    </li>
  );
}
