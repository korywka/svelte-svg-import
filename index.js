import { readFile } from 'fs/promises';
import { compile } from 'svelte/compiler';

/**
 * @param {string} source
 */
function process(source) {
	source = source.trim();

	// remove header
	const header = /^<\?xml.+>/;
	source = source.replace(header, '');
	source = source.trim();

	// remove comments
	const comments = /<!--.+-->/g;
	source = source.replaceAll(comments, '');

	// add props
	const svgGroups = new RegExp(/(<svg.*?)(>.*)/s);
	const [, svgOpen, svgOther] = svgGroups.exec(source);

	return `${svgOpen} {...$$props}${svgOther}`;
}

/**
 * @returns {import('vite').Plugin}
 */
export default function () {
	return {
		name: 'svelte-svg-import',
		async transform(_, id, options = {}) {
			if (!id.endsWith('.svg?svelte')) return null;
			const filename = id.replace('?svelte', '');
			const svg = await readFile(filename, { encoding: 'utf-8' });
			const code = process(svg);
			const result = compile(code, {
				css: 'none',
				filename: id,
				hydratable: !options.ssr,
				namespace: 'svg',
				generate: options.ssr ? 'ssr' : 'dom',
			});

			return {
				code: result.js.code,
				map: false,
			};
		},
	};
}
