import { init, dropLast, set, lensPath, last } from "ramda";

const indentSize = 2;

const taskRegexp = /(?<indent> *)- \[(?<checkmark>x| )\] (?<value>.*)/u;

function deserializeChild(child) {
  const { indent, checkmark, value } = taskRegexp.exec(child).groups;

  return {
    value,
    isDone: checkmark === "x",
    level: indent.length / indentSize,
  };
}

function getNewSiblingPath(path) {
  return [...init(path), last(path) + 1];
}

function deserializeChildren({ children, result, lastLevel, path }) {
  if (children.length === 0) {
    return result;
  }

  const [first, ...rest] = children;

  const { value, isDone, level } = deserializeChild(first);

  function getNewPath() {
    if (level > lastLevel) {
      return [...path, "children", 0];
    }

    if (level < lastLevel) {
      return getNewSiblingPath(dropLast(2, path));
    }

    return getNewSiblingPath(path);
  }

  const newPath = getNewPath();

  return deserializeChildren({
    children: rest,
    result: set(lensPath(newPath), { value, isDone, children: [] }, result),
    lastLevel: level,
    path: newPath,
  });
}

export default function deserialize(tasks) {
  return Object.entries(tasks).map(([taskList, children]) => ({
    value: taskList,
    isDone: false,
    children: deserializeChildren({
      children: children.split("\n"),
      result: [],
      lastLevel: 0,
      path: [-1],
    }),
  }));
}
