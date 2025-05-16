import { useContext, useEffect } from "react";
import { DisplayItemContext } from "../contexts/DisplayItemContext";

const LiveContent = () => {
  const context = useContext(DisplayItemContext);

  useEffect(() => {
    console.log("LiveContent context:", context);
  }, [context]);

  if (!context) {
    return <div className="live">DisplayItemContext not found.</div>;
  }

  const { liveItem } = context;

  return (
    <div className="live">
      <h1>Live Content</h1>
      <p>This is where the live content will be.</p>
      <pre>{JSON.stringify(context, null, 2)}</pre>
      {liveItem && (
        <div>
          <h2>Live Item:</h2>
          <p>{JSON.stringify(liveItem)}</p>
        </div>
      )}
      {!liveItem && <p>No live item selected.</p>}
    </div>
  );
};

export default LiveContent;
