import { getTasks } from "./selectors.js";

test("getTasks()", () => {
  expect.hasAssertions();

  expect(
    getTasks({
      editingValuePath: [],
      editingContentPath: [],

      tasks: [
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
      ],
    })
  ).toMatchObject([
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

test("getTasks() - isEditing", () => {
  expect.hasAssertions();

  expect(
    getTasks({
      editingValuePath: [0, 0],
      editingContentPath: [1, 0],

      tasks: [
        {
          children: [
            {
              children: [],
            },
          ],
        },
        {
          children: [
            {
              children: [],
            },
            {
              children: [],
            },
          ],
        },
      ],
    })
  ).toMatchObject([
    {
      isEditingValue: false,
      isEditingContent: false,

      children: [
        {
          isEditingValue: true,
          isEditingContent: false,
        },
      ],
    },
    {
      isEditingValue: false,
      isEditingContent: false,

      children: [
        {
          isEditingValue: false,
          isEditingContent: true,
        },
        {
          isEditingValue: false,
          isEditingContent: false,
        },
      ],
    },
  ]);
});
