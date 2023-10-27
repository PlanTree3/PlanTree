module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'prettier',
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
  ],
  settings: {
    // import/resolver` 는 `eslint-plugin-import` 의 경로 설정 옵션
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/vite.config.{js,ts}'],
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/button-has-type': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'react/function-component-definition': [
      2,
      { namedComponents: ['arrow-function'] },
    ],
    'import/no-unresolved': 'off',
    'spaced-comment': 'off',
  },
}
