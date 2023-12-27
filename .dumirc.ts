/**
 * .dumirc.ts
 */
import { defineConfig } from 'dumi'
const { NODE_ENV } = process.env

export default defineConfig({
    publicPath: NODE_ENV === 'production' ? '/res/libsx/' : '/',
    resolve: {
        // entryFile: 'src/pkg/index.ts',
        docDirs: ['docs', 'src/pkg'],
    },
    // apiParser: {},
    outputPath: `dist/res/libsx`,
    themeConfig: {
        name: `cola`,
        footer: `<p style='font-size: 12px; color: #666;'>Copyright © 2023 @libsx. MIT Licensed. Created by dbxiao</p>`
    },
});
