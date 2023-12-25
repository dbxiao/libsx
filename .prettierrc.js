module.exports = {
    pluginSearchDirs: false,
    plugins: [
        require.resolve('prettier-plugin-organize-imports'),
        require.resolve('prettier-plugin-packagejson'),
    ],
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    quoteProps: 'as-needed',
    jsxSingleQuote: true,
    useTabs: true,
    semi: false,
    tabWidth: 4,
    printWidth: 120,
    proseWrap: 'never',
    singleQuote: true,
    trailingComma: 'all',
    arrowParens: "always",
    endOfLine: "lf",
    embeddedLanguageFormatting: "auto",
    overrides: [
        {
            files: '*.md',
            options: {
                proseWrap: 'preserve',
            },
        },
    ],
};
