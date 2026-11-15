import { memo } from "react";
import type { ShapesApp } from "./ShapesApp";
import { useShapes } from "./react";
import styles from "./shapes.module.css";

export const ShapesView = memo(function ShapesView({
  app,
  windowId,
  active,
}: {
  app: ShapesApp;
  windowId: string;
  active: boolean;
}) {
  const { drawing, color, addShape, clear, setDefaultColor } = useShapes(
    app,
    windowId,
  );
  if (!drawing) return null;
  return (
    <div
      className={`app-content ${styles.shapesContent}`}
      data-content="shapes"
      data-active={active}
    >
      <div className="app-toolbar">
        <button onClick={() => addShape("circle")}>＋ Circle</button>
        <button onClick={() => addShape("square")}>＋ Square</button>
        <button onClick={clear}>Clear</button>
        <label className={styles.colorControl}>
          New shapes{" "}
          <input
            aria-label="Default shape color"
            type="color"
            value={color}
            onChange={(e) => setDefaultColor(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.shapeCanvas} aria-label="Drawing">
        {drawing.shapes.map((shape) => (
          <div
            key={shape.id}
            className={`${styles.shape} ${styles[shape.kind]}`}
            style={{ backgroundColor: shape.color }}
            aria-label={`${shape.kind} ${shape.color}`}
            role="img"
          />
        ))}
      </div>
      <footer className="app-footer">
        <span>{drawing.shapes.length} shapes</span>
        <span>Only on this visit</span>
      </footer>
    </div>
  );
});
