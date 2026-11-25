import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(process.cwd(), 'dist');
const prefix = '/try-the-look/';
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
};

const server = createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (pathname !== prefix && !pathname.startsWith(prefix)) {
    res.writeHead(404).end('Not found');
    return;
  }

  const relative = pathname.slice(prefix.length);
  const safe = normalize(relative || 'index.html').replace(/^(\.\.(\/|\\|$))+/, '');
  let file = join(root, safe);
  if (!existsSync(file) || !statSync(file).isFile()) {
    if (pathname === prefix || pathname === prefix + 'index.html') file = join(root, 'index.html');
    else {
      res.writeHead(404).end('Not found');
      return;
    }
  }

  res.writeHead(200, {
    'content-type': types[extname(file)] || 'application/octet-stream',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  });
  createReadStream(file).pipe(res);
});

server.listen(4178, '127.0.0.1', () => {
  console.log('Test server listening at http://127.0.0.1:4178/try-the-look/');
});
