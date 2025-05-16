import { createContext, useEffect, useRef, useState } from "react";

const DisplayItemContext = createContext();

export function DisplayItemProvider({ children }) {
  const [previewedItem, setPreviewedItem] = useState(null);
  const [liveItem, setLiveItemState] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");
    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "liveItem") {
        setLiveItemState(msg.data);
      }
    };
    return () => ws.current && ws.current.close();
  }, []);

  // Send liveItem to server and update local state
  const setLiveItem = (item) => {
    setLiveItemState(item);
    if (ws.current && ws.current.readyState === 1) {
      ws.current.send(JSON.stringify({ type: "setLiveItem", data: item }));
    }
  };

  return (
    <DisplayItemContext.Provider value={{
      previewedItem,
      setPreviewedItem,
      liveItem,
      setLiveItem,
    }}>
      {children}
    </DisplayItemContext.Provider>
  );
}

export { DisplayItemContext };
