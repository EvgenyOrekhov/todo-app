import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const movies = [
  {
    value: "Rambo",
    content: "",
    isDone: false,
    children: [
      {
        value: "Rambo: Last Blood",
        content: "line 0\nline1",
        isDone: false,
        children: [],
      },
      {
        value: "Rambo: First Blood",
        content: "",
        isDone: true,
        children: [],
      },
    ],
  },
  {
    value: "Frozen",
    content: "",
    isDone: true,
    children: [],
  },
];

function Item({ value, content, isDone, children }) {
  return (
    <li key={value}>
      <input type="checkbox" checked={isDone}></input>
      <label>{value}</label>
      <ul>{children.map(Item)}</ul>
      <pre>{content}</pre>
    </li>
  );
}

function App() {
  return <ul>{movies.map(Item)}</ul>;
}

export default App;
