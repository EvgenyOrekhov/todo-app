import React from "../_snowpack/pkg/react.js";
import Task from "./Task.js";
import "../_snowpack/pkg/ace-builds/src-noconflict/mode-markdown.js";
import "../_snowpack/pkg/ace-builds/src-noconflict/theme-tomorrow_night_bright.js";
import "./App.css.proxy.js";
export default function App({
  state,
  actions
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "add-task",
    onClick: actions.addTask,
    type: "button"
  }, "\u271A"), /*#__PURE__*/React.createElement("ul", {
    className: "tasks"
  }, state.tasks[0].children.map(task => /*#__PURE__*/React.createElement(Task, {
    actions: actions,
    key: task.id,
    state: state,
    task: task
  }))));
}