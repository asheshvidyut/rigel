import React, { useState } from "react";
import { Arrow, Circle, Transformer } from "react-konva";

let RCircle = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  setSelectedShape,
  toggleHover,
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, shapeProps.scaleX, shapeProps.scaleY, shapeProps.rotation]);

  const [shadowBlur, setShadowBlur] = useState(0);

  return (
    <React.Fragment>
      <Circle
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        onDblClick={() => {
          setSelectedShape(shapeProps.id);
        }}
        onMouseEnter={() => {
          setShadowBlur(10);
        }}
        onMouseOut={() => {
          setShadowBlur(0);
        }}
        shadowBlur={shadowBlur}
        shadowColor="#0b8793"
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
          setSelectedShape(shapeProps.id);
        }}
        onTransformStart={() => toggleHover(false)}
        onTransformEnd={(e) => {
          toggleHover(true);
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
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
            scaleX: scaleX,
            scaleY: scaleY,
          });
          setSelectedShape(shapeProps.id);
        }}
      />
      {isSelected && (
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

export default RCircle;
