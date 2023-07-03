# svelte-svg-import

Use SVG files as Svelte component

## Usage

Add Vite plugin `vite.config.js`:

```js
import svelteSvgImport from 'svelte-svg-import';

export default defineConfig({
	plugins: [
		svelteSvgImport(),
		sveltekit(),
	],
});
```

Import SVG file with `?svelte` suffix to use it as component:

```svelte
<script>
	import Image from 'image.svg?svelte';
</script>

<Image width="20" height="20" />
```

For Typescript support add [types for suffix](./types.d.ts) to your project (e.g. to `svg.d.ts`).