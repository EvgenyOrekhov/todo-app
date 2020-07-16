import deserialize from "./deserialize";

test("deserializes tasks", () => {
  expect(
    deserialize({
      default: `- [ ] Create a ToDo app`,
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
  ]);

  expect(
    deserialize({
      default: `- [ ] Create a ToDo app`,
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
          children: [
            {
              value: "Rambo: Last Blood",
              isDone: false,
              children: [],
            },
            {
              value: "Rambo: First Blood",
              isDone: true,
              children: [],
            },
          ],
        },
        {
          value: "Frozen",
          isDone: true,
          children: [],
        },
      ],
    },
  ]);
});
