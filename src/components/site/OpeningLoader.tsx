import { useEffect, useState } from "react";

export function OpeningLoader() {
  const [waiting, setWaiting] = useState(false);
  useEffect(() => {
    const image = document.querySelector<HTMLImageElement>("#home img");
    if (!image || (image.complete && image.naturalWidth > 0)) return;
    setWaiting(true);
    const finish = () => {
      if (image.complete && image.naturalWidth > 0) setWaiting(false);
    };
    image.addEventListener("load", finish);
    const interval = window.setInterval(finish, 100);
    // Never lock visitors out because a network request failed or is slow.
    const timeout = window.setTimeout(() => setWaiting(false), 5000);
    return () => {
      image.removeEventListener("load", finish);
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, []);
  if (!waiting) return null;
  return <div className="opening-loader" role="status" aria-live="polite">
    <span className="opening-loader-brand">HER CONCEPT</span>
    <span className="opening-loader-line" aria-hidden="true" />
    <span className="opening-loader-label">Carregando imagens…</span>
  </div>;
}