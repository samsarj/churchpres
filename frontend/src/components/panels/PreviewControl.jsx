import SlideController from "../global/SlideController";
import { useGlobalStore } from "../../stores/globalStore";

function PreviewControl() {
  const previewItem = useGlobalStore((state) => state.previewItem);
  const setPreviewSlideIndex = useGlobalStore((state) => state.setPreviewSlideIndex);
  const setLiveItem = useGlobalStore((state) => state.setLiveItem);

  const handleGoLive = () => {
    if (previewItem) setLiveItem(previewItem);
  };

  return (
    <SlideController item={previewItem} setActiveSlideIndex={setPreviewSlideIndex} onGoLive={handleGoLive} />
  );
}

export default PreviewControl;