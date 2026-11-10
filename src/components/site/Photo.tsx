import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { optimizedPhoto } from "@/lib/media";

type PhotoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & { source: string; full?: boolean };

export function Photo({ source, full = false, onLoad, onError, ...props }: PhotoProps) {
  const [fallback, setFallback] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const photo = optimizedPhoto(source);
  useEffect(() => { setFallback(false); }, [source]);
  // A cached failed request may complete before hydration attaches onError.
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth === 0) setFallback(true);
  }, [source]);
  return <img {...props} ref={ref} src={fallback ? source : full ? photo.full : photo.src}
    srcSet={fallback ? undefined : props.srcSet}
    onLoad={onLoad}
    onError={(event) => { if (!fallback) setFallback(true); onError?.(event); }} />;
}