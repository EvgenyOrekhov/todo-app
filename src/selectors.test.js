import { getViewModel } from "./selectors.js";

test("getViewModel() - paths", () => {
  expect.hasAssertions();

  expect(
    getViewModel({
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
  ).toMatchObject({
    tasks: [
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
    ],
  });
});

test("getViewModel() - isEditing (tasks)", () => {
  expect.hasAssertions();

  expect(
    getViewModel({
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
  ).toMatchObject({
    tasks: [
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
    ],
  });
});

test("getViewModel() - isEditing (global)", () => {
  expect.hasAssertions();

  expect(
    getViewModel({
      editingValuePath: [0],
      editingContentPath: [],
      tasks: [],
    })
  ).toMatchObject({
    isEditingValue: true,
    isEditingContent: false,
  });

  expect(
    getViewModel({
      editingValuePath: [],
      editingContentPath: [1],
      tasks: [],
    })
  ).toMatchObject({
    isEditingValue: false,
    isEditingContent: true,
  });

  expect(
    getViewModel({
      editingValuePath: [],
      editingContentPath: [],
      tasks: [],
    })
  ).toMatchObject({
    isEditingValue: false,
    isEditingContent: false,
  });
});
