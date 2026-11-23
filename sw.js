/* Activity 표준화 보고서 — 오프라인 캐시 (앱을 갱신하면 아래 VERSION 숫자를 올리세요) */
const VERSION='v2',CACHE='activity-'+VERSION,SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('activity-')&&x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url),same=u.origin===location.origin;
 if(same&&/\/apt-db\.json$/.test(u.pathname)){e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(CACHE).then(ch=>ch.put(r,c))}return x})));return}
 if(same){e.respondWith(fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(CACHE).then(ch=>ch.put(r,c))}return x}).catch(()=>caches.match(r).then(h=>h||caches.match('index.html'))));return}
 if(/cdnjs\.cloudflare\.com$/.test(u.hostname)){e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{if(x.ok||x.type==='opaque'){const c=x.clone();caches.open(CACHE).then(ch=>ch.put(r,c))}return x})))}});
