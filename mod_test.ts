import { format, FormatError } from "./mod.ts";

import {
  assertStrictEquals,
  assertThrows,
} from "https://deno.land/std@0.95.0/testing/asserts.ts";

Deno.test("format", () => {
  assertStrictEquals(format("Hello, {}!", true), "Hello, true!");
  assertStrictEquals(format("Hello, {}!", "Carter"), "Hello, Carter!");
  assertStrictEquals(format("Hello, {:?}!", "Carter"), 'Hello, "Carter"!');

  assertThrows(() => {
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    format("Hello, {}!");
  }, FormatError);

  assertThrows(() => {
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    format("Hello!", "Hello");
  }, FormatError);

  assertStrictEquals(
    format("{} {}", "United States", 1776),
    "United States 1776"
  );
});
