import applyTypescript from "@rollup/plugin-typescript"
import resolveNodeJs from '@rollup/plugin-node-resolve'
import applyTerser from '@rollup/plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import legacy from "@rollup/plugin-legacy"
import sveltePreprocess from "svelte-preprocess"
import svelte from "rollup-plugin-svelte"
import clear from "rollup-plugin-clear"

const dev = true // !!process.env.ROLLUP_WATCH
const args = process.argv.slice(2);
const inputDir = args.find(arg => arg.startsWith('--INPUT_DIR='))?.split('=')[1] || 'src';
const outputDir = args.find(arg => arg.startsWith('--OUTPUT_DIR='))?.split('=')[1] || 'dist';

export default  {
    dev: dev,
    input: [
        `${inputDir}/index.ts`
    ],
    output: [
        {
            dir: outputDir,
            format: "es",
            sourcemap: dev,
            // manualChunks:{
            //     chartjs: ["chart.js"],
            //     domtoimage: ["dom-to-image"],
            //     sweetAlert2: ["sweetalert2"],
            //     easepick: ["@easepick/amp-plugin", "@easepick/core", "@easepick/lock-plugin", "@easepick/range-plugin"]
            // }
        }
    ],
    plugins: [
        clear({
            // required, point out which directories should be clear.
            targets: [outputDir],
            // optional, whether clear the directores when rollup recompile on --watch mode.
            watch: true, // default: false
        }),
        commonjs({
            namedExports:{
                "dom-to-image": ["dom-to-image"],
            }
        }),
        resolveNodeJs({
            mainFields: [ "module", "browser", "main" ],
            browser: true,
            dedupe: ['svelte']
        }),
        applyTypescript(),
        applyTerser(),
        legacy({ 'node_modules/leader-line/leader-line.min.js': 'LeaderLine' }),
        svelte({
            compilerOptions: {
                dev
            },
            preprocess: sveltePreprocess(),
        })
    ],
    onwarn: (warning, handle) => {
        // Ignore node_modules warnings
        if(warning.loc?.file?.includes("node_modules") || warning.ids?.toString()?.includes("node_modules"))
            return

        handle(warning.message)
    },
    preserveSymlinks: true
}