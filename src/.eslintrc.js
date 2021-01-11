module.exports = {
  root: true,
  "ignorePatterns": [
    "projects/**/*",
    "*.spec.ts",
    "main.ts", "test.ts"
  ],
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: [
          "tsconfig.*?.json",
          "e2e/tsconfig.json"
        ],
        createDefaultProgram: true
      },
      extends: [
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "airbnb-typescript/base",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier/@typescript-eslint"
      ],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "import/no-unresolved": "off",
        "import/prefer-default-export": "off",
        "class-methods-use-this": "off",
        "lines-between-class-members": "off",
        "no-return-assign": "error",
        "no-shadow" : "off" ,
        "max-len": [
        "error",
        {
          "code": 130,
          "tabWidth": 2
          }
        ],
        "@typescript-eslint/no-shadow" : [
          "error"
        ],
        "@typescript-eslint/unbound-method": [
          "error",
          {
            "ignoreStatic": true
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ],
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ]
      },
      "overrides": [
        {
          // enable the rule specifically for TypeScript files
          "files": ["*.ts", "*.tsx"],
          "rules": {
            "@typescript-eslint/explicit-module-boundary-types": ["error"]
          }
        }
      ]
    },
    {
      files: ['src/**/*.spec.ts', 'src/**/*.d.ts'],
      parserOptions: {
        project: './src/tsconfig.spec.json',
      },
      extends: ['plugin:jasmine/recommended'],
      plugins: ['jasmine'],
      env: { jasmine: true },
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ["*.component.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {
        "max-len": ["error", { "code": 130 }]
      }
    },
    {
      files: ["*.component.ts"],
      extends: ["plugin:@angular-eslint/template/process-inline-templates"]
    }
  ]
}
