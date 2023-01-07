module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb',
        'prettier',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            js: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    parser: 'babel-eslint',
    rules: {
        'linebreak-style': 0,
        'no-console': 1,
        'no-tabs': 0,
        'no-empty': 1,
        'eol-last': 0,
        'no-undef': 2,
        'no-unused-vars': 1,
        'quote-props': ['error', 'consistent', { keywords: true }],
        'no-useless-escape': 0,
        'import/newline-after-import': [1, { count: 1 }],
        'import/prefer-default-export': 0,
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/react-in-jsx-scope': 1,
        'no-await-in-loop': 0,
        'no-plusplus': 0,
        'no-param-reassign': 0,
        'prettier/prettier': [
            'error',
            {
                trailingComma: 'all',
                semi: false,
                singleQuote: true,
                useTabs: false,
                endOfLine: 'auto',
                bracketSpacing: true,
                printWidth: 85,
                tabWidth: 4,
                usePrettierrc: false,
            },
        ],
    },
}
