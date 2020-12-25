import { combineReducers } from "redux";
import editor from "./editor";
import layer from "./layer";
import design from "./design";

export default combineReducers({
  layer: layer,
  editor: editor,
  design: design,
});
