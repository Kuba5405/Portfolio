// Shim to make react-dom/server compatible with ESM named imports
// Some environments (or package builds) expose react-dom/server as CommonJS.
// Import the default and re-export the commonly used named exports.
import ReactDOMServer from 'react-dom/server';

const { renderToReadableStream, renderToPipeableStream, renderToStaticMarkup } = ReactDOMServer || {};

export { renderToReadableStream, renderToPipeableStream, renderToStaticMarkup };
export default ReactDOMServer;
