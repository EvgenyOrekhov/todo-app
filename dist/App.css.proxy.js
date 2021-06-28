// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".tasks {\n  list-style-type: none;\n  padding-inline-start: 0;\n}\n\n.tasks .tasks {\n  list-style-type: none;\n  padding-inline-start: 2rem;\n}\n\n.task {\n  display: flex;\n  align-items: center;\n  height: 2.25rem;\n}\n\n.value {\n  display: flex;\n  flex-grow: 1;\n  align-items: center;\n  margin-left: 0.5rem;\n}\n\n.value > :first-child {\n  flex-grow: 1;\n}\n\n.value > input {\n  margin-left: calc(-0.5rem - 1px);\n}\n\n.value > .clickable-value > :first-child {\n  margin: 0;\n}\n\n.is-done .clickable-value {\n  text-decoration: line-through;\n}\n\n.is-done .content {\n  position: relative;\n  max-height: 16rem;\n  overflow-y: hidden;\n  opacity: 0.5;\n}\n\n.is-done .content::after {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 4rem;\n  content: \"\";\n  background-image: linear-gradient(\n    to bottom,\n    transparent,\n    var(--background-color)\n  );\n}\n\n.add-task {\n  width: 100%;\n}\n\n.delete {\n  display: none;\n}\n\n.value:hover .clickable-value ~ .delete {\n  display: initial;\n}\n\n.editable-content {\n  min-height: 16rem;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}