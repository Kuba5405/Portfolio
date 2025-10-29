// Shim to make react-dom/server compatible with ESM named imports
// Some environments expose react-dom/server as CommonJS while others expose ESM named exports.
// Import the module as a namespace and pick either the namespace or its default export safely.
// Use dynamic import inside wrapper functions to avoid circular resolution
// and to delay module evaluation until runtime.
async function getReactDOMServer() {
	const mod = await import('react-dom/server');
	return mod && 'default' in mod ? mod.default : mod;
}

export async function renderToReadableStream(...args) {
	const R = await getReactDOMServer();
	return R.renderToReadableStream(...args);
}

export async function renderToPipeableStream(...args) {
	const R = await getReactDOMServer();
	return R.renderToPipeableStream(...args);
}

export async function renderToStaticMarkup(...args) {
	const R = await getReactDOMServer();
	return R.renderToStaticMarkup(...args);
}

// default export for compatibility: an object of wrapper functions
export default {
	renderToReadableStream,
	renderToPipeableStream,
	renderToStaticMarkup
};
