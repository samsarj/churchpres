import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function SlideShortcutBar({ content, activeIndex, onSelect }) {
  return (
    <ButtonGroup className="mb-2">
      {content.map((slide, idx) => (
        <Button
          key={slide.shorthand}
          variant={slide.variant}
          active={idx === activeIndex}
          onClick={() => onSelect(idx)}
          size="sm"
        >
          {slide.shorthand}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default SlideShortcutBar;
