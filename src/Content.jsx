import React from "react";
import ReactMarkdown from "react-markdown";
import AceEditor from "react-ace";
import { equals } from "ramda";

import { isSelectingText } from "./util.js";

function Content({ task, state, actions }) {
  const { content, path } = task;

  function handleContentClick() {
    if (!isSelectingText() && state.editingContentPath.length === 0) {
      actions.editingContentPath.set(path);
    }
  }

  function handleContentFocus() {
    if (content === "" && state.editingContentPath.length === 0) {
      actions.editingContentPath.set(path);
    }
  }

  function handleContentKeyDown(event) {
    if (state.editingContentPath.length !== 0) {
      return;
    }

    if (event.key === "Enter") {
      actions.editingContentPath.set(path);

      event.preventDefault();
    }
  }

  return (
    <div
      onClick={handleContentClick}
      onFocus={handleContentFocus}
      onKeyDown={handleContentKeyDown}
      tabIndex={
        equals(path, state.editingContentPath) ||
        (!content && !equals(path, state.editingValuePath))
          ? "-1"
          : "0"
      }
    >
      {equals(path, state.editingContentPath) ? (
        <AceEditor
          className="editable-content"
          commands={[
            {
              name: "save",
              bindKey: { win: "Ctrl-Enter", mac: "Command-Enter" },

              exec(editor) {
                actions.setContent(editor.getValue());
              },
            },
            {
              name: "cancel",
              bindKey: { win: "Escape", mac: "Escape" },

              exec() {
                actions.editingContentPath.reset();
              },
            },
          ]}
          defaultValue={content}
          focus
          height="100%"
          mode="markdown"
          onBlur={(event, editor) => actions.setContent(editor.getValue())}
          onFocus={(event, editor) => editor.navigateFileStart()}
          theme="tomorrow_night_bright"
          width="100%"
        />
      ) : (
        <div className="content">
          <ReactMarkdown escapeHtml={false} source={content} />
        </div>
      )}
    </div>
  );
}

export default Content;
