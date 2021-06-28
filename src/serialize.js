const indentSize = 2;

function serializeChildren(children, level) {
  const indent = " ".repeat(level * indentSize);

  function serializeChild(child) {
    const checkmark = child.isDone ? "x" : " ";
    const serializedChildren = serializeChildren(child.children, level + 1);
    const contentIndent = " ".repeat((level + 1) * indentSize);
    const content = child.content
      ? `\n${child.content.replace(/^/gmu, contentIndent)}`
      : "";

    return `${indent}- [${checkmark}] ${child.value}${content}${serializedChildren}`;
  }

  return (
    (children.length > 0 && level !== 0 ? "\n" : "") +
    children.map(serializeChild).join("\n")
  );
}

export default function serialize(tasks) {
  return Object.fromEntries(
    tasks.map(({ value, children }) => [value, serializeChildren(children, 0)])
  );
}
