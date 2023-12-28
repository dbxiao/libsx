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
        footer: `<p style='font-size: 12px; color: #666;'>Copyright © 2023 libsx.com | MIT Licensed | <a href="https://www.beianx.cn/" target="_blank" >渝ICP备2023017828号-1</a> | Created by <a href="https://github.com/dbxiao"  target="_blank">dbxiao</a> </p>`
    },
});
