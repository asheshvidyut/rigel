export const SHAPES = {
  ELLIPSE: "ELLIPSE",
  RECTANGLE: "RECTANGLE",
  LINE: "LINE",
  ARROW: "ARROW",
  POLYGON: "POLYGON",
  STAR: "STAR",
  IMAGE: "IMAGE",
};

export const SHAPES_CONFIG = {
  ELLIPSE: {
    x: 80,
    y: 150,
    width: 100,
    height: 100,
    fill: "gray",
  },
  RECTANGLE: {
    x: 50,
    y: 100,
    width: 100,
    height: 100,
    fill: "gray",
  },
  LINE: {
    x: 50,
    stroke: "gray",
    strokeWidth: 5,
    y: 100,
    points: [0, 100, 100, 0],
  },
  ARROW: {
    x: 50,
    stroke: "gray",
    strokeWidth: 5,
    y: 100,
    points: [0, 100, 100, 0],
  },
  POLYGON: {
    x: 50,
    stroke: "gray",
    strokeWidth: 5,
    y: 100,
    sides: 3,
    radius: 70,
  },
  STAR: {
    x: 100,
    y: 150,
    numPoints: 5,
    innerRadius: 40,
    outerRadius: 70,
    fill: "gray",
    stroke: "black",
    strokeWidth: 4,
  },
};
