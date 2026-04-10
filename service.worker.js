const CACHE_NAME = "mari-app-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/script.js",
  "/style.css",

  // sounds
  "/ma.mp3",
  "/pi.mp3",

  // images
  "/fotos/1000059490.jpg",
  "/fotos/thedevil.jpg",
  "/fotos/1000056634.jpg",
  "/fotos/1774351727491.jpg",
  "/fotos/1774351727143.jpg",
  "/fotos/1774351727127.jpg",
  "/fotos/img1.jpg",
  "/fotos/1000055905.jpg",
  "/fotos/1000055907.jpg",
  "/fotos/nse-98606783224790500-1715555341947.jpg.jpg",
  "/fotos/1000047655.jpg",
  "/fotos/1000047744.jpg",
  "/fotos/nse-2515942221337976915-1715555951227.jpg.jpg",
  "/fotos/nse-6593644393319663142-1715555951262.jpg.jpg",
  "/fotos/nse-4844485910258128076-1715555342054.jpg.jpg",
  "/fotos/1774351727301.jpg",
  "/fotos/nse-7912453498104862471-1715549569659.jpg.jpg",
  "/fotos/1000056246.jpg",
  "/fotos/voluntarioundokaimaki_teve um infarto_so um velho parou e checou.jpg",
  "/fotos/1000055240.jpg",
  "/fotos/1000055779.jpg",
  "/fotos/1774351727396.jpg",
  "/fotos/1774351727475.jpg",
  "/fotos/marihj.jpg",
  "/fotos/1774351727176.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Caching all assets");
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener("activate", event => {
  const whitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.map(name => {
          if (!whitelist.includes(name)) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});