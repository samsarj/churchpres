import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

function SlideController({ item, setActiveSlide, useOrder }) {
  const [activeId, setActiveId] = useState(null);
  const useOrderValue = useOrder !== undefined ? useOrder : true;

  const handleSelect = (content, index) => {
    setActiveId(index);
    setActiveSlide(index);
    console.log(`Selected: ${content.shorthand} - ${content.lyrics}`);
  };

  return (
    <ListGroup variant="flush" style={{ maxHeight: "100%", overflowY: "auto" }}>
      {item && item.content &&
        (useOrderValue ? item.order : item.content).map((orderItem, index) => {
          const content = useOrderValue
            ? item.content.find((content) => content.shorthand === orderItem)
            : orderItem;
          return (
            <ListGroup.Item
              action
              key={index}
              active={index === activeId}
              onClick={() => handleSelect(content, index)}
              className="d-flex align-items-center p-0"
            >
              <div
                className="mx-2 d-flex justify-content-center"
                style={{ width: "10%" }}
              >
                <Badge bg={content.variant}>{content.shorthand}</Badge>
              </div>
              <div
                className="my-2 me-2"
                style={{
                  width: "90%",
                  whiteSpace: "pre-wrap",
                  fontSize: "0.8rem",
                }}
              >
                {content.lyrics.split('\n').map((line, lineIndex) => (
                  <div key={lineIndex} style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: 'rgba(0, 0, 0, 0.2)', marginRight: '5px', flexShrink: 0 }}>
                      {lineIndex + 1}
                    </span>
                    <span style={{ whiteSpace: 'pre-wrap' }}>{line}</span>
                  </div>
                ))}
              </div>
            </ListGroup.Item>
          );
        })}
    </ListGroup>
  );
}

export default SlideController;
