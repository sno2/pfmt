# pfmt

A strongly-typed Deno module for formatting and printing to the console inspired
by Rust's `format` and `println` macros.

## Usage

Import any members from this module via the deno.land/x registry:

```ts
import { format } from "https://deno.land/x/pfmt/mod.ts";

println("Hello, {}!", "user"); // "Hello, user!"
```

## Walkthrough

pfmt is very similar to Rust's `println` and `format` macros in the sense that
you declare different "slots" (places where variables can go) within the first
parameter via curly braces and then declare the values for the slots in the
parameters after the slot template string. The `format` function returns a
generated `string` from the given slot template and slot template variables and
the `println` function logs out the equivalent `format` function with the given
arguments.

```ts
format("Hello, {}!", "user"); // returns "Hello, user"
println("Hello, {}!", "user"); // logs "Hello, user"
```

> Remember, you must include a slot variable for every single slot template you
> have within your first slot template string. I advise you to use TypeScript
> because it will auto-magically check if you are doing that correctly.

You can also specify if you want to use `Deno.inspect` for a given varibale by
adding in `:?` as the slot type.

```ts
println("{}", { age: 23 }); // logs "[Object object]"
println("{:?}", { age: 23 }); // logs "{ age: 23 }"
```

pfmt maintains its type-soundness via TypeScript conditional types and generics.
This allows us to verify at compile-time whether or not the correct template is
being passed into `println` and `format`. Here is an example of this at use:

```ts
println("Hello, {}!"); // TypeScript Compile Error: expected 2 parameters got 1

println("Hello, {} {}!"); // TypeScript Compile Error: expected 3 parameters got 1

println("Mr. {}. Welcome back, we missed you.", "Anderson"); // no errors :) works as expected
```

## Testing

Make sure you run `deno test` to check if any of the code is broken.

## Contributing

Before you contribute, make sure you [test](#testing) and run `deno fmt` before
committing.

## License

[MIT](./LICENSE)
