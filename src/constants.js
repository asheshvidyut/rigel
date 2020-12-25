export const SHAPES = {
  ELLIPSE: "ELLIPSE",
  RECTANGLE: "RECTANGLE",
  LINE: "LINE",
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
    points: [0, 0, 100, 100],
  },
};
