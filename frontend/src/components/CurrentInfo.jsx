import { useState, useEffect } from "react";
import { useGlobalStore } from "../stores/globalStore";
import { useServicePlanStore } from "../stores/servicePlanStore";

export const CurrentItemAndService = () => {
  const [currentService, setCurrentService] = useState("Current Service");
  const currentItem = useGlobalStore((state) => state.liveItem);
  const currentItemName = currentItem ? currentItem.name : "No Item Live";

  return (
    <span>
      {currentItemName} | {currentService}
    </span>
  );
};

export const CurrentTimeAndDate = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <span>
      {date.toLocaleTimeString()} | {date.toLocaleDateString()}
    </span>
  );
};
