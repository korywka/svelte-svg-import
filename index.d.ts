declare module 'svelte-svg-import' {
	import type { Plugin } from 'vite'
	export default function plugin(): Plugin
}

declare module '*.svg?svelte' {
	import type { ComponentType, SvelteComponent } from 'svelte'
	import type { SVGAttributes } from 'svelte/elements'

	type Constraint = SVGAttributes<SVGSVGElement>
	const content: ComponentType<SvelteComponent<Constraint>>

	export default content
}
