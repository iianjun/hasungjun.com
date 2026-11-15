import type { Application } from "../../desktop/react";
import { ShapesApp } from "./ShapesApp";
import { ShapesView } from "./ShapesView";
import shapesStyles from "./shapes.module.css";

export const shapesApplication: Application = {
  id: "shapes",
  title: "Shapes",
  icon: (
    <span className={`app-icon ${shapesStyles.shapesIcon}`} aria-hidden="true">
      <i />
      <b />
    </span>
  ),
  create: (ports) => new ShapesApp(ports),
  render: (app, id, active) => {
    if (!(app instanceof ShapesApp))
      throw new Error("Invalid Shapes registration");
    return <ShapesView app={app} windowId={id} active={active} />;
  },
};
