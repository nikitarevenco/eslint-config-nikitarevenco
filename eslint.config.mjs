import nikitarevenco from "eslint-config-nikitarevenco";

export default nikitarevenco(
  {
    project: "tsconfig.json",
    tsconfigRootDir: import.meta.dirname,
  },
  { security: false, functional: false },
);
