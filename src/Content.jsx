import React from "react";
import ReactMarkdown from "react-markdown";
import AceEditor from "react-ace";
import { equals } from "ramda";

import { isSelectingText } from "./util.js";
import makeKeyDownHandler from "./makeKeyDownHandler.js";

function Content({ task, state, actions }) {
  const { content, path } = task;

  function handleRenderedContentClick() {
    if (!isSelectingText()) {
      actions.editingContentPath.set(path);
    }
  }

  function handleContentFocus() {
    if (state.editingContentPath.length === 0 && content === "") {
      actions.editingContentPath.set(path);
    }
  }

  const handleContentKeyDown = makeKeyDownHandler({
    Enter: (event) => {
      if (state.editingContentPath.length === 0) {
        event.preventDefault();
        actions.editingContentPath.set(path);
      }
    },
  });

  return (
    <div
      onFocus={handleContentFocus}
      onKeyDown={handleContentKeyDown}
      role="button"
      tabIndex={
        content === "" && !equals(path, state.editingValuePath) ? "-1" : "0"
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
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events -- this is handled by the parent
        <div className="content" onClick={handleRenderedContentClick}>
          <ReactMarkdown escapeHtml={false} source={content} />
        </div>
      )}
    </div>
  );
}

export default Content;
