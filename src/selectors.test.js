import { getTasksWithPaths } from "./selectors.js";

test("getTasksWithPaths()", () => {
  expect.hasAssertions();

  expect(
    getTasksWithPaths([
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
      path: [0],
      value: "default",
      isDone: false,

      children: [
        {
          path: [0, 0],
          value: "Create a ToDo app",
          isDone: false,
          children: [],
        },
      ],
    },
    {
      path: [1],
      value: "Movies",
      isDone: false,

      children: [
        {
          path: [1, 0],
          value: "Rambo",
          isDone: false,
          children: [],
        },
        {
          path: [1, 1],
          value: "Frozen",
          isDone: true,
          children: [],
        },
      ],
    },
  ]);
});
