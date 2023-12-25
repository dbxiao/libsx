/**
 * .dumirc.ts
 */
import { defineConfig } from 'dumi'
const { npm_package_name } = process.env

export default defineConfig({
    resolve: {
        docDirs: ['docs', 'src'],
    },
    outputPath: `dist/res/${npm_package_name}`,
    themeConfig: {
        name: npm_package_name,
        footer: `<p style='font-size: 12px; color: #666;'>Copyright © 2023 ${npm_package_name}. MIT Licensed. Created by dbxiao</p>`
    }
});
