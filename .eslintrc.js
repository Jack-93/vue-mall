// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 7
    },
    env: {
        commonjs: true,
        browser: true,
        es6: true,
        jquery: true
    },
    extends: 'eslint:recommended',
    plugins: [
        'html', 'vue'
    ],
    // add your custom rules here
    rules: {
        'indent': ['error', 4, {'SwitchCase': 1}],
        'quotes': ['error', 'single'],
        'no-unused-vars': 1,
        'no-extra-boolean-cast': 0,
        'no-console': 0,
    }
}
