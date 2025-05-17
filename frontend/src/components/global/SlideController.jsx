import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import SlideShortcutBar from "./SlideShorcutBar";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";

function SlideListItem({ slide, index, active, onSelect }) {
  return (
    <ListGroup.Item
      action
      active={active}
      onClick={() => onSelect(slide, index)}
      className="d-flex align-items-center p-0"
    >
      <div
        className="mx-2 d-flex justify-content-center"
        style={{ width: "10%" }}
      >
        <Badge bg={slide.variant}>{slide.id}</Badge>
      </div>
      <div
        className="my-2 me-2"
        style={{
          width: "90%",
          whiteSpace: "pre-wrap",
          fontSize: "0.8rem",
        }}
      >
        {slide.mediaType === "text" && slide.lyrics
          ? slide.lyrics.split("\n").map((line, lineIndex) => (
              <div
                key={lineIndex}
                style={{ display: "flex", alignItems: "flex-start" }}
              >
                <span
                  style={{
                    color: "rgba(0, 0, 0, 0.2)",
                    marginRight: "5px",
                    flexShrink: 0,
                  }}
                >
                  {lineIndex + 1}
                </span>
                <span style={{ whiteSpace: "pre-wrap" }}>{line}</span>
              </div>
            ))
          : slide.label}
      </div>
    </ListGroup.Item>
  );
}

function SlideController({ item, setActiveSlideIndex, useOrder, onGoLive }) {
  const [activeId, setActiveId] = useState(null);
  const useOrderValue = useOrder !== undefined ? useOrder : true;

  useEffect(() => {
    // Reset activeId to 0 when item changes
    setActiveId(0);
    setActiveSlideIndex(0);
  }, [item, setActiveSlideIndex]);

  const handleSelect = (slide, index) => {
    setActiveId(index);
    setActiveSlideIndex(index);
  };

  return (
    <>
      <ListGroup
        variant="flush"
        style={{ maxHeight: "100%", overflowY: "auto" }}
      >
        {item &&
          item.slides &&
          (useOrderValue && item.order
            ? item.order.map((orderId, index) => {
                const slide = item.slides.find((s) => s.id === orderId);
                if (!slide) return null;
                return (
                  <SlideListItem
                    key={index}
                    slide={slide}
                    index={index}
                    active={index === activeId}
                    onSelect={handleSelect}
                  />
                );
              })
            : item.slides.map((slide, index) => (
                <SlideListItem
                  key={index}
                  slide={slide}
                  index={index}
                  active={index === activeId}
                  onSelect={handleSelect}
                />
              )))}
      </ListGroup>
    </>
  );
}

export default SlideController;
