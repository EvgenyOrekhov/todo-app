import merge from "mergerino";

import actions from "./actions.js";

test("tasks.moveRight() - noop", () => {
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
    actions.tasks.moveRight({
      state,
      payload: [0, 0],
    })
  ).toMatchObject(state);
});

test("tasks.moveRight() - noop last", () => {
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
    JSON.stringify(
      merge(
        state,
        actions.tasks.moveRight({
          state,
          payload: [0, 0, 0],
        })
      )
    )
  ).toStrictEqual(JSON.stringify(state));
});

test("tasks.moveRight() - last", () => {
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
    merge(
      state,
      actions.tasks.moveRight({
        state,
        payload: [0, 1],
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
      ],
    },
  ]);
});

test("tasks.moveRight() - not last", () => {
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
      actions.tasks.moveRight({
        state,
        payload: [0, 1],
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
          children: [],
        },
      ],
    },
  ]);
});

test("tasks.moveRight() - with children", () => {
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

          children: [
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
      actions.tasks.moveRight({
        state,
        payload: [0, 1],
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

test("tasks.moveRight() - in the middle with siblings", () => {
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

          children: [
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
      actions.tasks.moveRight({
        state,
        payload: [0, 1],
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
  ]);
});

test("tasks.moveRight() - bug", () => {
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

              children: [
                {
                  value: "4",
                  children: [],
                },
              ],
            },
            {
              value: "5",

              children: [
                {
                  value: "6",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  expect(
    merge(
      state,
      actions.tasks.moveRight({
        state,
        payload: [0, 0, 2],
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
            {
              value: "3",

              children: [
                {
                  value: "4",
                  children: [],
                },
                {
                  value: "5",
                  children: [],
                },
                {
                  value: "6",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
});
