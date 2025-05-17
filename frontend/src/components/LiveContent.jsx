import { useEffect } from "react";
import { useGlobalStore } from "../stores/globalStore";

const LiveContent = () => {
  const liveItem = useGlobalStore((state) => state.liveItem);

  useEffect(() => {
    console.log("LiveContent liveItem:", liveItem);
  }, [liveItem]);

  return (
    <div className="live">
      <h1>Live Content</h1>
      <p>This is where the live content will be.</p>
      <pre>{JSON.stringify(liveItem, null, 2)}</pre>
      {liveItem ? (
        <div>
          <h2>Live Item:</h2>
          <p>{JSON.stringify(liveItem)}</p>
        </div>
      ) : (
        <p>No live item selected.</p>
      )}
    </div>
  );
};

export default LiveContent;
