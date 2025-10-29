// Shim to make react-dom/server compatible with ESM named imports
// Some environments expose react-dom/server as CommonJS while others expose ESM named exports.
// Import the module as a namespace and pick either the namespace or its default export safely.
import * as ReactDOMServerNS from 'react-dom/server';

// Prefer the default export if present (CommonJS interop), otherwise use the namespace
const ReactDOMServer = ReactDOMServerNS && 'default' in ReactDOMServerNS ? ReactDOMServerNS.default : ReactDOMServerNS;

export const renderToReadableStream = ReactDOMServer?.renderToReadableStream;
export const renderToPipeableStream = ReactDOMServer?.renderToPipeableStream;
export const renderToStaticMarkup = ReactDOMServer?.renderToStaticMarkup;

export default ReactDOMServer;
