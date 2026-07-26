# `@lucid-softworks/number-random-int`

Generate a safe integer in a half-open interval. Inject a random source for
repeatable tests or seeded generation; sources must return values in `[0, 1)`.

```ts
import { randomInt } from "@lucid-softworks/number-random-int";

randomInt(1, 7); // 1 through 6
randomInt(10, 20, () => 0.5); // 15
```
