import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const pkg = JSON.parse(json);


/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		preprocess({ postcss: true }),
	],

	kit: {
		adapter: adapter(),
		version: {
			name: pkg.version
		}
	}
};

export default config;
