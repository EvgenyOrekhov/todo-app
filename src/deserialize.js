import { init, dropLast, set, lensPath, last, over } from "ramda";

const indentSize = 2;

const taskRegexp = /^(?<indent> *)- \[(?<checkmark> |x)\] (?<value>.*)/u;

function deserializeChild(child) {
  const result = taskRegexp.exec(child);

  if (result === null) {
    return child;
  }

  const { indent, checkmark, value } = result.groups;

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

  const deserializedChild = deserializeChild(first);

  if (typeof deserializedChild === "string") {
    return deserializeChildren({
      children: rest,

      result: over(
        lensPath([...path, "content"]),
        (content) =>
          `${content}${content ? "\n" : ""}${deserializedChild.trim()}`,
        result
      ),

      lastLevel,
      path,
    });
  }

  const { value, isDone, level } = deserializedChild;

  function getNewPath() {
    if (level > lastLevel) {
      return [...path, "children", 0];
    }

    if (level < lastLevel) {
      // Have to drop 2 last items: "children" and index.
      // eslint-disable-next-line no-magic-numbers
      return getNewSiblingPath(dropLast(2, path));
    }

    return getNewSiblingPath(path);
  }

  const newPath = getNewPath();

  return deserializeChildren({
    children: rest,

    result: set(
      lensPath(newPath),
      { value, content: "", isDone, children: [] },
      result
    ),

    lastLevel: level,
    path: newPath,
  });
}

export default function deserialize(tasks) {
  return Object.entries(tasks).map(([value, children]) => ({
    value,
    isDone: false,

    children: deserializeChildren({
      children: children.split("\n"),
      result: [],
      lastLevel: 0,

      // The index is getting increased by 1 BEFORE the first item is created,
      // so to get 0, it has to start with -1.
      // eslint-disable-next-line no-magic-numbers
      path: [-1],
    }),
  }));
}
