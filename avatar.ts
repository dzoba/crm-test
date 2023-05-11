import { createAvatar } from 'npm:@dicebear/core';
import { avataaars } from 'npm:@dicebear/collection';

import { render } from "https://deno.land/x/resvg_wasm/mod.ts";

const ava = createAvatar(avataaars, {
  seed: "Felix"
});

console.log('ava', ava.toString());

const data = await render(ava.toString());

await Deno.writeFile("example.png", data);