// This module is web-compatible.

type FormatTemplateSlot<Template extends string, Value> =
  // this comment line makes deno fmt makes the type actually readable
  Template extends ":?"
    ? Value extends string
      ? `"${Value}"`
      : Value extends number | boolean | bigint | null | undefined
      ? `${Value}`
      : string
    : Template extends ""
    ? Value extends string | number | bigint | boolean | null | undefined
      ? `${Value}`
      : string
    : string;

export type ExtractSlots<
  Template extends string,
  $Draft extends string[] = [],
  $Rest extends string = Template
> =
  //
  $Rest extends `${infer _}{${infer _}}${infer $$Rest}` // deno-lint-ignore no-explicit-any
    ? ExtractSlots<$$Rest, [...$Draft, any]>
    : $Draft;

export type FillSlots<
  Template extends string,
  // deno-lint-ignore no-explicit-any
  AllInputs extends any[]
> =
  //
  Template extends `${infer $Start}{${infer $SlotType}}${infer $End}`
    ? AllInputs extends [first: infer $First, ...rest: infer $RestInputs]
      ? FillSlots<
          `${$Start}${FormatTemplateSlot<$SlotType, $First>}${$End}`,
          $RestInputs
        >
      : never
    : Template;

export class FormatError extends Error {}

export const FORMAT_REGEX = /{[^{}]*}/g;

/**
 * Generates a `string` from the given slot template string and slot variables.
 * @param template The slot template string.
 * @param variables The slot template variables.
 * @returns The generated `string` from the slot template string and slot template variables.
 */
export function format<
  Template extends string,
  $Vars extends ExtractSlots<Template> = ExtractSlots<Template>
>(template: Template, ...variables: $Vars): FillSlots<Template, $Vars> {
  const parts = template.split(FORMAT_REGEX);
  const formatters = [FORMAT_REGEX.exec(template) ?? [[]]][0].map(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    (formatter: string) => formatter.slice(1, -1)
  );

  let draft = "";

  if (parts.length > variables.length + 1) {
    throw new FormatError("Expected more inputs");
  } else if (parts.length < variables.length + 1) {
    throw new FormatError("Unexpected template");
  }

  for (let i = 0; i < parts.length; i++) {
    let val: unknown = variables[i];
    switch (formatters[i]) {
      case ":?":
        val = globalThis?.Deno?.inspect?.(val);
    }
    draft += parts[i] + (val ?? "");
  }

  // deno-lint-ignore no-explicit-any
  return draft as any;
}

/**
 * Logs out a `string` formatted using the given slot template string and slot variables.
 * @param template The slot template string.
 * @param variables The slot template variables.
 * @returns The generated `string` from the slot template string and slot template variables.
 */
export function println<Template extends string>(
  template: Template,
  ...variables: ExtractSlots<Template>
): void {
  console.log(format(template, ...variables));
}
