import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import';
import tailwindcssNesting from 'tailwindcss/nesting/index.js'

export default {
	plugins: [
		postcssImport(),
		tailwindcssNesting(),
		tailwindcss(),
		//But others, like autoprefixer, need to run after,
		autoprefixer
	]
};

