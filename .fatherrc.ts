import { defineConfig } from 'father';
import path from 'path'

export default defineConfig({
    // more father config: https://github.com/umijs/father/blob/master/docs/config.md
    alias: {
        '@common': path.resolve(__dirname, 'src/common'),
        '@widget': path.resolve(__dirname, 'src/widget'),
        '@pkg': path.resolve(__dirname, 'src/pkg'),
    },
    sourcemap: true,
    esm: { output: 'dist/pkg' },
});
