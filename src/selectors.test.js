import { getTasksWithIds } from "./selectors.js";

test("getTasksWithIds()", () => {
  expect.hasAssertions();

  expect(
    getTasksWithIds([
      {
        value: "default",
        isDone: false,

        children: [
          {
            value: "Create a ToDo app",
            isDone: false,
            children: [],
          },
        ],
      },
      {
        value: "Movies",
        isDone: false,

        children: [
          {
            value: "Rambo",
            isDone: false,
            children: [],
          },
          {
            value: "Frozen",
            isDone: true,
            children: [],
          },
        ],
      },
    ])
  ).toStrictEqual([
    {
      id: [0],
      value: "default",
      isDone: false,

      children: [
        {
          id: [0, 0],
          value: "Create a ToDo app",
          isDone: false,
          children: [],
        },
      ],
    },
    {
      id: [1],
      value: "Movies",
      isDone: false,

      children: [
        {
          id: [1, 0],
          value: "Rambo",
          isDone: false,
          children: [],
        },
        {
          id: [1, 1],
          value: "Frozen",
          isDone: true,
          children: [],
        },
      ],
    },
  ]);
});
