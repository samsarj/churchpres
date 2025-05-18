import React, { useEffect } from "react";
import { useGlobalStore } from "../stores/globalStore"; // adjust path if needed

export default function LiveContent() {

  const liveItem = useGlobalStore((state) => state.liveItem);
  const liveSlideIndex = useGlobalStore((state) => state.liveSlideIndex);
  const blank = useGlobalStore((state) => state.blank);
  const clear = useGlobalStore((state) => state.clear);
  const initLiveSync = useGlobalStore((state) => state.initLiveSync);

  useEffect(() => {
    initLiveSync();
  }, [initLiveSync]);

  if (clear) return <div style={styles.clear}>CLEAR</div>;
  if (blank) return <div style={styles.blank}></div>;

  if (!liveItem || !liveItem.slides || !liveItem.slides[liveSlideIndex]) {
    return <div style={styles.blank}>Waiting for live content…</div>;
  }

  const slide = liveItem.slides[liveSlideIndex];

  return (
    <div style={styles.wrapper}>
      {slide.mediaType === "text" && (
        <div style={styles.text}>{slide.lyrics}</div>
      )}

      {slide.mediaType === "image" && (
        <img
          src={slide.src}
          alt={slide.label || "Image"}
          style={styles.media}
        />
      )}

      {slide.mediaType === "video" && (
        <video src={slide.src} controls autoPlay style={styles.media} />
      )}

      {slide.mediaType === "ppt" && (
        <iframe
          src={slide.src}
          title="PPT Slide"
          style={styles.media}
          allowFullScreen
        />
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100vw",
    height: "100vh",
    background: "black",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    fontSize: "3rem",
    textAlign: "center",
  },
  text: {
    whiteSpace: "pre-wrap",
    lineHeight: 1.4,
  },
  media: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  blank: {
    width: "100vw",
    height: "100vh",
    background: "black",
  },
  clear: {
    width: "100vw",
    height: "100vh",
    background: "white",
    color: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4rem",
  },
};
