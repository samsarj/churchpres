import React from "react";
import { Alert, Button, ButtonGroup, Card } from "react-bootstrap";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { X } from "react-bootstrap-icons";
import { v4 as uuidv4 } from "uuid";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const SlideOrder = ({ content, order, setOrder }) => {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setOrder((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", event.target.dataset.shorthand);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const shorthand = event.dataTransfer.getData("text/plain");
    setOrder([...order, { id: uuidv4(), shorthand }]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveFromOrder = (index) => {
    setOrder(order.filter((_, i) => i !== index));
  };

  const allSlidesOrdered = content.every((slide) =>
    order.some((orderedSlide) => orderedSlide.shorthand === slide.shorthand)
  );

  return (
    <Card>
      <Card.Header as="h5">Slide Ordering</Card.Header>
      <Card.Body>
        Available Slides for ordering:
        <div className="w-100 bg-light d-flex align-items-center justify-content-center">
          {content.map((slide, index) => (
            <Button
              style={{ cursor: "grab" }}
              key={index}
              className="m-1"
              size="sm"
              variant={slide.variant}
              draggable
              data-shorthand={slide.shorthand}
              onDragStart={handleDragStart}
            >
              {slide.shorthand}
            </Button>
          ))}
        </div>
        Ordered Slides:
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={order.map((slide) => slide.id)}
            strategy={horizontalListSortingStrategy}
          >
            <div
              className="w-100 bg-light d-flex align-items-center justify-content-center overflow-auto"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {order.map((slide, index) => (
                <SortableItem key={slide.id} id={slide.id}>
                  <ButtonGroup className="m-1" size="sm">
                    <Button
                      style={{ cursor: "grab" }}
                      variant={
                        content.find((c) => c.shorthand === slide.shorthand)
                          .variant
                      }
                    >
                      {slide.shorthand}
                    </Button>
                    <Button
                      variant={
                        content.find((c) => c.shorthand === slide.shorthand)
                          .variant
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromOrder(index);
                      }}
                      className="p-0"
                    >
                      <X />
                    </Button>
                  </ButtonGroup>
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </Card.Body>
      <Card.Footer>
        Drag and drop slides to order them.
        {!allSlidesOrdered
          ? (
            <Alert variant="warning">
              Not all slides are included in the order.
              </Alert>
          )
          : ""}
      </Card.Footer>
    </Card>
  );
};

export default SlideOrder;
