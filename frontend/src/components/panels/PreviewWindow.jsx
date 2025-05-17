import { useGlobalStore } from "../../stores/globalStore";

function PreviewWindow() {
  const previewItem = useGlobalStore((state) => state.previewItem);
  const previewSlideIndex = useGlobalStore((state) => state.previewSlideIndex);

  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      {previewItem && (
        <div>
          {previewItem.slides && previewItem.slides[previewSlideIndex] && (
            <div>
              <p>{previewItem.slides[previewSlideIndex].lyrics}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PreviewWindow;
