// service-worker.js

// 캐시할 파일 목록
const CACHE_NAME = 'v1'
const URLS_TO_CACHE = ['/']

// 서비스 워커 설치 및 캐시
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache')
      return cache.addAll(URLS_TO_CACHE)
    }),
  )
})

// 캐시된 자원으로 요청에 응답
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 캐시에서 찾으면 캐시된 자원 반환, 아니면 네트워크 요청 수행
      return response || fetch(event.request)
    }),
  )
})

// 캐시 관리: 오래된 캐시 제거
// self.addEventListener('activate', (event) => {
//   const cacheWhitelist = [CACHE_NAME]
//
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName)
//           }
//         }),
//       )
//     }),
//   )
// })
