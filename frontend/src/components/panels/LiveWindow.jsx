import { useGlobalStore } from "../../stores/globalStore";

function LiveWindow() {
  const liveItem = useGlobalStore((state) => state.liveItem);
  const liveSlideIndex = useGlobalStore((state) => state.liveSlideIndex);

  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      {liveItem && (
        <div>
          {liveItem.slides && liveItem.slides[liveSlideIndex] && (
            <div>
              <p>{liveItem.slides[liveSlideIndex].lyrics}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LiveWindow;
