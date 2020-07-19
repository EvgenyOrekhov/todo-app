import deserialize from "./deserialize.js";

test("deserializes tasks", () => {
  expect.hasAssertions();

  expect(
    deserialize({
      default: "- [ ] Create a ToDo app",
      Movies: `- [ ] Rambo
- [x] Frozen`,
    })
  ).toStrictEqual([
    {
      value: "default",
      isDone: false,

      children: [
        {
          value: "Create a ToDo app",
          content: "",
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
          content: "",
          isDone: false,
          children: [],
        },
        {
          value: "Frozen",
          content: "",
          isDone: true,
          children: [],
        },
      ],
    },
  ]);

  expect(
    deserialize({
      default: "- [ ] Create a ToDo app",
      Movies: `- [ ] Rambo
  - [ ] Rambo: Last Blood
  - [x] Rambo: First Blood
- [x] Frozen`,
    })
  ).toStrictEqual([
    {
      value: "default",
      isDone: false,

      children: [
        {
          value: "Create a ToDo app",
          content: "",
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
          content: "",
          isDone: false,

          children: [
            {
              value: "Rambo: Last Blood",
              content: "",
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
      ],
    },
  ]);
});

test("deserializes content", () => {
  expect.hasAssertions();

  expect(
    deserialize({
      default: `- [ ] Create a ToDo app
  - [ ] Test content
    line 0
    line 1`,
    })
  ).toStrictEqual([
    {
      value: "default",
      isDone: false,

      children: [
        {
          value: "Create a ToDo app",
          content: "",
          isDone: false,

          children: [
            {
              value: "Test content",
              content: `line 0
line 1`,
              isDone: false,
              children: [],
            },
          ],
        },
      ],
    },
  ]);
});
