import { useState, useEffect } from "react";

export function useNetwork() {
  const [hasNetwork, setHasNetwork] = useState<boolean>(navigator.onLine); // network state
  const ON = "online";
  const OFF = "offline";

  useEffect(() => {
    // online change function
    function handleOnlineChange() {
      setHasNetwork(true);
    }

    // offline change function
    function handleOfflineChange() {
      setHasNetwork(false);
    }

    window.addEventListener(ON, handleOnlineChange);
    window.addEventListener(OFF, handleOfflineChange);

    return () => {
      window.addEventListener(ON, handleOnlineChange);
      window.addEventListener(OFF, handleOfflineChange);
    };
  }, []);

  return hasNetwork;
}
