import { expect, test } from "vitest";

const sum = ({ a, b }: { a: number; b: number }) => {
  return a + b;
};

test("adds 1 + 2 to equal 3", () => {
  expect(sum({ a: 1, b: 2 })).toBe(3);
});
