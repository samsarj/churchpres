import { useContext } from "react";
import SlideController from "../global/SlideController";

import { DisplayItemContext } from "../../contexts/DisplayItemContext";  // Corrected import path

function PreviewControl() {
  const { previewedItem, setLiveItem } = useContext(DisplayItemContext);

  const handleGoLive = () => {
    if (previewedItem) setLiveItem(previewedItem);
  };

  return (
    <SlideController item={previewedItem} onGoLive={handleGoLive} />
  );
}

export default PreviewControl;