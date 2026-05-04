constCACHE = "pwa-demo-v1";
constASSETS = [
    "./", "./index.html", "./app.js", "./styles.css", "./manifest.json",
    "./pages/home.html", "./pages/about.html", "./pages/contact.html",
    "./icons/icon-192.png"
];
// 1. install —precache everything
self.addEventListener("install", e => e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
));
// 2. activate —drop old caches
self.addEventListener("activate", e => e.waitUntil(
    caches.keys().then(ks => Promise.all(
        ks.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
));
// 3. fetch —cache first, fall back to network
self.addEventListener("fetch", e => e.respondWith(
    caches.match