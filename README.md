# eslint-config-nikitarevenco

This is my personal config that I use in all of my projects. It has hundreds of eslint rules and is extremely strict.

```sh
pnpm add -D eslint-config-nikitarevenco
```

## Usage

Most basic:

```ts
import nikitarevenco from "eslint-config-nikitarevenco";

export default nikitarevenco({
  project: "tsconfig.json",
  tsconfigRootDir: import.meta.dirname,
});
```

You can also override any rules, as well as disable an entire plugin by specifying `false`.

```ts
import nikitarevenco from "eslint-config-nikitarevenco";

const override = {
  "jsx-a11y"
}

export default nikitarevenco(
  { project: "tsconfig.json", tsconfigRootDir: import.meta.dirname },
  { react: override, unicorn: false }
);
```

As well as pass in however many additional eslint configurations that you want:

```ts
import nikitarevenco from "eslint-config-nikitarevenco";

const override = {
  "jsx-a11y": "off"
}

export default nikitarevenco(
  { project: "tsconfig.json", tsconfigRootDir: import.meta.dirname },
  { react: override, unicorn: false },
  { plugins: /* ... */, rules: /* ... */ },
  { plugins: /* ... */, rules: /* ... */ }
  // ... etc
);
```

## Presets

- TODO: Add some presets like `recommended` and `strict`

## Renamed plugins

List of plugins used in this config, as well as their new name.

| New Prefix                      | Original Prefix        | Source Plugin                                                                                               |
| ------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| `ts/*`                          | `@typescript-eslint/*` | [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint)                  |
| `unicorn/*` (unchanged)         | `unicorn/*`            | [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)                              |
| `sonar/*`                       | `sonarjs/*`            | [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)                               |
| `promise/*` (unchanged)         | `promise/*`            | [eslint-plugin-promise](https://github.com/eslint-community/eslint-plugin-promise)                          |
| `hooks/*`                       | `react-hooks/*`        | [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks) |
| `a11y/*`                        | `jsx-a11y/*`           | [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)                              |
| `sonar/*`                       | `sonarjs/*`            | [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)                               |
| `tailwind/*`                    | `tailwindcss/*`        | [eslint-plugin-tailwindcss](https://github.com/tailwindlabs/eslint-plugin-tailwindcss)                      |
| `import-sort/*`                 | `simple-import-sort/*` | [simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)                            |
| `next/*`                        | `@next/next/*`         | [eslint-plugin-next](https://github.com/nextjs/eslint-plugin-next)                                          |
| `import/*`                      | `import-x/*`           | [eslint-plugin-import-x](https://github.com/import-x/eslint-plugin-import-x)                                |
| `eslint-comments/*` (unchanged) | `eslint-comments/*`    | [eslint-plugin-eslint-comments](https://github.com/mysticatea/eslint-plugin-eslint-comments)                |
| `immutable/*`                   | `functional/*`         | [eslint-plugin-functional](https://github.com/functional/eslint-plugin-functional)                          |
| `prettier/*` (unchanged)        | `prettier/*`           | [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)                                |
| `regexp/*` (unchanged)          | `regexp/*`             | [eslint-plugin-regexp](https://github.com/swigg/eslint-plugin-regexp)                                       |

You can also override and specify your own custom names for each plugin.

```ts
import nikitarevenco from "eslint-config-nikitarevenco";

export default nikitarevenco({
  project: "tsconfig.json",
  tsconfigRootDir: import.meta.dirname,
  renames: {
    "@typescript-eslint": "typescript",
  },
});
```
