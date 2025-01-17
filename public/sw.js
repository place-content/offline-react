const CACHE_NAME = "PWA_OFFLINE_REACT_CACHE_V1";
const OFFLINE_HTML_URL = "/offline.html";

const PRECACHE_ASSETS = [OFFLINE_HTML_URL];

const _self = self;

// "install" 이벤트: 서비스 워커 설치 시 실행
_self.addEventListener("install", (e) => {
  console.log("[sw.js - Install] Install event is working!");

  // 캐시를 열고, 미리 정의된 리소스를 추가
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((_cache) => {
        console.log("[sw.js - Install] Caching app shell");
        return _cache.addAll(PRECACHE_ASSETS);
      })
      .catch((_err) => {
        console.error("[sw.js - Install] Failed install", _err);
      })
  );
});

// "activate" 이벤트: 새로운 서비스 워커 활성화 시 실행
_self.addEventListener("activate", (e) => {
  console.log("[sw.js - activate] Activating new service worker...");

  // 기존에 저장된 캐시들 중, 현재 캐시 이름과 다른 것들을 제거
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((_cacheName) => {
          if (_cacheName !== CACHE_NAME) {
            console.log("[sw.js - activate] Remove old cache... ", _cacheName);
            return caches.delete(_cacheName);
          }
        })
      ).catch((_err) => {
        console.error("[sw.js - activate] Failed activate");
      });
    })
  );

  // 클라이언트들이 즉시 새로운 서비스 워커를 사용하도록 설정
  return self.clients.claim();
});

// "fetch" 이벤트: 네트워크 요청 가로채기
_self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      // 네트워크 요청 실패 시 오프라인 페이지 반환
      if (e.request.mode === "navigate") {
        return caches.match(OFFLINE_HTML_URL);
      }
    })
  );
});
