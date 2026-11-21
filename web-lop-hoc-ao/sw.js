/* Service worker: cho phép cài app và học offline */
const VERSION = 'khtd-v1';
const SHELL = [
  './', 'index.html', 'assets/style.css', 'assets/app.js', 'manifest.webmanifest', 'data/qa.json', 'data/assets.json',
  'img/icons/icon-192.png', 'img/icons/icon-512.png', 'img/icons/favicon-64.png',
  'chapters/c01.html', 'chapters/c02b.html', 'chapters/c02a.html', 'chapters/c03.html', 'chapters/c04.html',
  'chapters/c05.html', 'chapters/c06.html', 'chapters/c07.html', 'chapters/c08.html', 'chapters/c09.html',
  'chapters/c10.html', 'chapters/c11.html', 'chapters/c12.html', 'chapters/c13.html', 'chapters/c14.html',
  'chapters/c15.html', 'chapters/c16.html', 'chapters/tong-on.html'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('khtd-') && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Hình ảnh: ưu tiên bộ nhớ đệm
  if (url.origin === location.origin && /\.(jpe?g|png|webp|svg)$/i.test(url.pathname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    })));
    return;
  }
  // Nội dung khác: lấy bản mới khi có mạng, mất mạng thì dùng bản đã lưu
  e.respondWith(fetch(req).then(res => {
    if (res.ok && (url.origin === location.origin || url.host.includes('fonts.g'))) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req, { ignoreSearch: true }).then(hit => hit || (req.mode === 'navigate' ? caches.match('index.html') : undefined))));
});
