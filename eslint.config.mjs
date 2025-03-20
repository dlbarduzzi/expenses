import antfu from "@antfu/eslint-config"

export default antfu({
  type: "app",
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: false,
    quotes: "double",
  },
}, {
  rules: {
    "no-empty": "error",
    "no-empty-function": "error",
    "node/no-process-env": "error",
    "node/no-process-exit": "error",
    "prefer-const": "error",
    "perfectionist/sort-imports": ["error", {
      tsconfigRootDir: ".",
    }],
    "style/max-len": ["error", { code: 88 }],
    "style/quotes": "error",
    "ts/no-unused-vars": ["error", {
      args: "all",
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
    }],
    "ts/no-explicit-any": "error",
    "ts/no-unused-expressions": "off",
    "ts/consistent-type-definitions": "off",
    "unicorn/filename-case": ["error", {
      case: "kebabCase",
      ignore: ["README.md", "LICENSE"],
    }],
  },
})
