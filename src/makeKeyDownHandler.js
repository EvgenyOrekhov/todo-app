import makeKeyEventToString from "key-event-to-string";

const keyEventToString = makeKeyEventToString();

export default function makeKeyDownHandler(map) {
  return (event) => {
    const currentKey = keyEventToString(event);

    Object.entries(map).some(([key, handler]) => {
      if (currentKey === key) {
        handler(event);

        return true;
      }

      return false;
    });
  };
}
