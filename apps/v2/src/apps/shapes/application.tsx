import type { Application } from "../../desktop/bridge/react";
import { ShapesApp } from "./core/ShapesApp";
import { ShapesProvider } from "./bridge/react";
import { ShapesView } from "./ui/ShapesView";
import shapesStyles from "./ui/shapes.module.css";

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
    return (
      <ShapesProvider value={app}>
        <ShapesView windowId={id} active={active} />
      </ShapesProvider>
    );
  },
};
