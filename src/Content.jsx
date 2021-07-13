import React, { memo, useCallback, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import AceEditor from "react-ace";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import prettier from "prettier";

import { isSelectingText } from "./util.js";
import makeKeyDownHandler from "./makeKeyDownHandler.js";

const ReactMarkdownMemoized = memo(ReactMarkdown);
const rehypePlugins = [rehypeRaw, rehypeSanitize];

function handleEditorFocus(event, editor) {
  editor.navigateFileStart();
}

function format(source) {
  return prettier.format(source, { parser: "markdown" });
}

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
      // Prevent printing a blank line at the beginning of the content:
      event.preventDefault();

      actions.editingContentPath.set(path);
    },

    "Ctrl + Enter": () => actions.addNextTask(path),
    "Shift + Enter": () => actions.addSubtask(path),
  });

  const handleEditorBlur = useCallback(
    (event, editor) => actions.setContent(format(editor.getValue())),
    [actions]
  );

  const commands = useMemo(
    () => [
      {
        name: "save",
        bindKey: { win: "Ctrl-Enter", mac: "Command-Enter" },

        exec(editor) {
          actions.setContent(format(editor.getValue()));
        },
      },
      {
        name: "cancel",
        bindKey: { win: "Escape", mac: "Escape" },

        exec() {
          actions.editingContentPath.reset();
        },
      },
    ],
    [actions]
  );

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
          commands={commands}
          defaultValue={content}
          focus
          height="100%"
          mode="markdown"
          onBlur={handleEditorBlur}
          onFocus={handleEditorFocus}
          theme="tomorrow_night_bright"
          width="100%"
        />
      ) : (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events -- this is handled by the parent
        <div className="content" onClick={handleRenderedContentClick}>
          <ReactMarkdownMemoized rehypePlugins={rehypePlugins}>
            {content}
          </ReactMarkdownMemoized>
        </div>
      )}
    </div>
  );
}
