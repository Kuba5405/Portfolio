import { RemixServer } from '@remix-run/react';
import isbot from 'isbot';
import ReactDOMServer from '../shims/react-dom-server.js';

const { renderToReadableStream } = ReactDOMServer;

export default async function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  const body = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    }
  );

  // If crawler/bot, wait for all content to be ready
  const ua = request.headers.get('user-agent');
  const isBotRequest = ua && typeof isbot === 'function' && isbot(ua);
  if (isBotRequest && body?.allReady) {
    try {
      await body.allReady;
    } catch (e) {
      // ignore
    }
  }

  responseHeaders.set('Content-Type', 'text/html');

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
