import React, { useState } from "react";
import { Rect, Transformer } from "react-konva";

let Rectangle = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  setSelectedShape,
  toggleHover,
  selectOnHover,
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (
      !(shapeProps.hasOwnProperty("canBeTransformed")
        ? shapeProps.canBeTransformed
        : true)
    ) {
      return;
    }
    shapeRef.current.rotation(shapeProps.rotation);
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [
    isSelected,
    shapeProps,
    shapeProps.scaleX,
    shapeProps.scaleY,
    shapeProps.rotation,
    shapeProps.canBeTransformed,
  ]);

  const [shadowBlur, setShadowBlur] = useState(0);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onMouseEnter={() => {
          if (selectOnHover) {
            setShadowBlur(10);
            setSelectedShape(shapeProps.id);
          }
        }}
        onMouseLeave={() => {
          if (selectOnHover) {
            setShadowBlur(0);
          }
        }}
        shadowBlur={shadowBlur}
        shadowColor="#0b8793"
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformStart={() => {
          if (
            !(shapeProps.hasOwnProperty("canBeTransformed")
              ? shapeProps.canBeTransformed
              : true)
          ) {
            return;
          }
          toggleHover(false);
        }}
        onTransformEnd={(e) => {
          if (
            !(shapeProps.hasOwnProperty("canBeTransformed")
              ? shapeProps.canBeTransformed
              : true)
          ) {
            return;
          }
          toggleHover(true);
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const width = node.width();
          const height = node.height();
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, width * scaleX),
            height: Math.max(5, height * scaleY),
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected &&
        (shapeProps.hasOwnProperty("canBeTransformed")
          ? shapeProps.canBeTransformed
          : true) && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
    </React.Fragment>
  );
};

export default Rectangle;
