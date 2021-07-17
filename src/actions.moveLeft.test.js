import merge from "mergerino";

import actions from "./actions.js";

test("tasks.moveLeft() - noop", () => {
  expect.hasAssertions();

  const state = [
    {
      children: [
        {
          value: "1",
          children: [],
        },
        {
          value: "2",
          children: [],
        },
      ],
    },
  ];

  expect(
    actions.tasks.moveLeft({
      state,
      payload: [0, 0],
    })
  ).toMatchObject(state);

  expect(
    actions.tasks.moveLeft({
      state,
      payload: [0, 1],
    })
  ).toMatchObject(state);
});

test("tasks.moveLeft() - last", () => {
  expect.hasAssertions();

  const state = [
    {
      children: [
        {
          value: "1",

          children: [
            {
              value: "2",
              children: [],
            },
          ],
        },
      ],
    },
  ];

  expect(
    merge(
      state,
      actions.tasks.moveLeft({
        state,
        payload: [0, 0, 0],
      })
    )
  ).toMatchObject([
    {
      children: [
        {
          value: "1",
          children: [],
        },
        {
          value: "2",
          children: [],
        },
      ],
    },
  ]);
});

test("tasks.moveLeft() - not last", () => {
  expect.hasAssertions();

  const state = [
    {
      children: [
        {
          value: "1",

          children: [
            {
              value: "2",
              children: [],
            },
          ],
        },
        {
          value: "3",
          children: [],
        },
      ],
    },
  ];

  expect(
    merge(
      state,
      actions.tasks.moveLeft({
        state,
        payload: [0, 0, 0],
      })
    )
  ).toMatchObject([
    {
      children: [
        {
          value: "1",
          children: [],
        },
        {
          value: "2",
          children: [],
        },
        {
          value: "3",
          children: [],
        },
      ],
    },
  ]);
});

test("tasks.moveLeft() - with siblings", () => {
  expect.hasAssertions();

  const state = [
    {
      children: [
        {
          value: "1",

          children: [
            {
              value: "2",
              children: [],
            },
            {
              value: "3",
              children: [],
            },
          ],
        },
      ],
    },
  ];

  expect(
    merge(
      state,
      actions.tasks.moveLeft({
        state,
        payload: [0, 0, 0],
      })
    )
  ).toMatchObject([
    {
      children: [
        {
          value: "1",
          children: [],
        },
        {
          value: "2",

          children: [
            {
              value: "3",
              children: [],
            },
          ],
        },
      ],
    },
  ]);
});

test("tasks.moveLeft() - in the middle with siblings", () => {
  expect.hasAssertions();

  const state = [
    {
      children: [
        {
          value: "1",

          children: [
            {
              value: "2",
              children: [],
            },
            {
              value: "3",
              children: [],
            },
            {
              value: "4",
              children: [],
            },
          ],
        },
      ],
    },
  ];

  expect(
    merge(
      state,
      actions.tasks.moveLeft({
        state,
        payload: [0, 0, 1],
      })
    )
  ).toMatchObject([
    {
      children: [
        {
          value: "1",

          children: [
            {
              value: "2",
              children: [],
            },
          ],
        },
        {
          value: "3",

          children: [
            {
              value: "4",
              children: [],
            },
          ],
        },
      ],
    },
  ]);
});
