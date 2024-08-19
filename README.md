# eslint-config-nikitarevenco

This is my personal config that I use in all of my projects. It has hundreds of eslint rules and is extremely strict.

```sh
pnpm add -D eslint-config-nikitarevenco
```

## Usage

Most basic:

```ts
import nikitarevenco from "eslint-config-nikitarevenco";

export default nikitarevenco("tsconfig.json", import.meta.dirname);
```

You can also override any rules, as well as disable an entire plugin by specifying `false`.

```ts
import nikitarevenco from "eslint-config-nikitarevenco";

const override = {
  "jsx-a11y"
}

export default nikitarevenco("tsconfig.json", import.meta.dirname,
  { react: override, unicorn: false }
);
```

As well as pass in however many additional eslint configurations that you want:

```ts
import nikitarevenco from "eslint-config-nikitarevenco";

const override = {
  "jsx-a11y": "off"
}

export default nikitarevenco("tsconfig.json", import.meta.dirname,
  { react: override, unicorn: false },
  { plugins: /* ... */, rules: /* ... */ },
  { plugins: /* ... */, rules: /* ... */ }
  // ... etc
);
```
