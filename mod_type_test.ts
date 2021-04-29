import type { ExtractSlots, FillSlots } from "./mod.ts";

Deno.test("Type Tests", () => {});

{
  // `FillSlots` Tests

  const _: FillSlots<"Hello {}", ["Carter"]> = "Hello Carter";
  const __: FillSlots<"Hello {}", []> = 23 as never;
  const ___: FillSlots<"Hello", ["Carter"]> = 23 as never;
}

{
  // `ExtractSlots` Tests

  const _: ExtractSlots<"Hello"> = [];
  const __: ExtractSlots<"Hello {}"> = [1];
  const ___: ExtractSlots<"{} {} {}"> = [1, 2, 3];
}
