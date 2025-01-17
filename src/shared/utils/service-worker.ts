/**
 * serviceWorkerLoad
 *
 * @type Function<void>
 *
 * @param: X
 *
 * * main.tsx에서 service-worker register 시켜주는 코드 (캐시에 offline.html 저장)
 */
export function serviceWorkerLoad() {
  const SERVICE_WORKER = "serviceWorker";

  //* 만약 서비스 워커가 navigator에 있다면
  if (SERVICE_WORKER in navigator) {
    //* sw.js로 register 시도
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("# service-worker.ts success to register ", registration);

          // * register 되고 추가 actions 작성
        })
        .catch((_error) => {
          // ! Failed to register service-worker
          console.error("# service-worker.ts failed to register ", _error);

          // ! 추가 에러 바운더리 처리
        });
    });
  }
}
