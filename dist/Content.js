import React, { memo, useCallback, useMemo } from "../_snowpack/pkg/react.js";
import ReactMarkdown from "../_snowpack/pkg/react-markdown.js";
import AceEditor from "../_snowpack/pkg/react-ace.js";
import rehypeRaw from "../_snowpack/pkg/rehype-raw.js";
import rehypeSanitize from "../_snowpack/pkg/rehype-sanitize.js";
import { isSelectingText } from "./util.js";
import makeKeyDownHandler from "./makeKeyDownHandler.js";
const ReactMarkdownMemoized = /*#__PURE__*/memo(ReactMarkdown);
const rehypePlugins = [rehypeRaw, rehypeSanitize];

function handleEditorFocus(event, editor) {
  editor.navigateFileStart();
}

export default function Content({
  task,
  state,
  actions
}) {
  const {
    content,
    path,
    isEditingValue,
    isEditingContent
  } = task;

  function handleRenderedContentClick() {
    if (!isSelectingText()) {
      actions.editingContentPath.set(path);
    }
  }

  function handleContentFocus() {
    if (!state.isEditingContent && content === "") {
      actions.editingContentPath.set(path);
    }
  }

  const handleContentKeyDown = makeKeyDownHandler({
    Enter: event => {
      // Prevent printing a blank line at the beginning of the content:
      event.preventDefault();
      actions.editingContentPath.set(path);
    },
    "Ctrl + Enter": () => actions.addNextTask(path),
    "Shift + Enter": () => actions.addSubtask(path)
  });
  const handleEditorBlur = useCallback((event, editor) => actions.setContent(editor.getValue()), [actions]);
  const commands = useMemo(() => [{
    name: "save",
    bindKey: {
      win: "Ctrl-Enter",
      mac: "Command-Enter"
    },

    exec(editor) {
      actions.setContent(editor.getValue());
    }

  }, {
    name: "cancel",
    bindKey: {
      win: "Escape",
      mac: "Escape"
    },

    exec() {
      actions.editingContentPath.reset();
    }

  }], [actions]);
  return /*#__PURE__*/React.createElement("div", {
    onFocus: handleContentFocus,
    onKeyDown: state.isEditingContent ? undefined : handleContentKeyDown,
    role: "button",
    tabIndex: content === "" && !isEditingValue ? "-1" : "0"
  }, isEditingContent ? /*#__PURE__*/React.createElement(AceEditor, {
    className: "editable-content",
    commands: commands,
    defaultValue: content,
    focus: true,
    height: "100%",
    mode: "markdown",
    onBlur: handleEditorBlur,
    onFocus: handleEditorFocus,
    theme: "tomorrow_night_bright",
    width: "100%"
  }) :
  /*#__PURE__*/
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events -- this is handled by the parent
  React.createElement("div", {
    className: "content",
    onClick: handleRenderedContentClick
  }, /*#__PURE__*/React.createElement(ReactMarkdownMemoized, {
    rehypePlugins: rehypePlugins
  }, content)));
}