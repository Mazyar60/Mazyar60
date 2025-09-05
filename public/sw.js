const CACHE_NAME = "coinmining-game-v1"
const urlsToCache = [
  "/",
  "/plans",
  "/miners",
  "/wallet",
  "/vip",
  "/profile",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }
      return fetch(event.request)
    }),
  )
})

self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New mining update available!",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2",
    },
    actions: [
      {
        action: "explore",
        title: "View Details",
        icon: "/icon-192.png",
      },
      {
        action: "close",
        title: "Close",
        icon: "/icon-192.png",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("CoinMining.Game", options))
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/miners"))
  } else if (event.action === "close") {
    event.notification.close()
  } else {
    event.waitUntil(clients.openWindow("/"))
  }
})
