import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import AceEditor from "react-ace";

import { isSelectingText } from "./util.js";
import makeKeyDownHandler from "./makeKeyDownHandler.js";

const ReactMarkdownMemoized = memo(ReactMarkdown);

export default function Content({ task, state, actions }) {
  const { content, path, isEditingValue, isEditingContent } = task;

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
    Enter: (event) => {
      event.preventDefault();
      actions.editingContentPath.set(path);
    },

    "Ctrl + Enter": () => actions.addNextTask(path),
    "Shift + Enter": () => actions.addSubtask(path),
  });

  return (
    <div
      onFocus={handleContentFocus}
      onKeyDown={state.isEditingContent ? undefined : handleContentKeyDown}
      role="button"
      tabIndex={content === "" && !isEditingValue ? "-1" : "0"}
    >
      {isEditingContent ? (
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
          <ReactMarkdownMemoized escapeHtml={false} source={content} />
        </div>
      )}
    </div>
  );
}
