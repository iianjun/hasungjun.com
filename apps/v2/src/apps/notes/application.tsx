import type { Application } from "../../desktop/bridge/react";
import { NotesApp } from "./core/NotesApp";
import { NotesView } from "./ui/NotesView";
import notesStyles from "./ui/notes.module.css";

export const notesApplication: Application = {
  id: "notes",
  title: "Notes",
  icon: (
    <span className={`app-icon ${notesStyles.notesIcon}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  ),
  create: (ports) =>
    new NotesApp(
      ports,
      (signal) =>
        new Promise((resolve, reject) => {
          const timer = setTimeout(
            () =>
              resolve(
                "A little room to think.\n\nOpen another window. Move things around.\nYour notes stay here until you close them.",
              ),
            500,
          );
          signal.addEventListener(
            "abort",
            () => {
              clearTimeout(timer);
              reject(new DOMException("Cancelled", "AbortError"));
            },
            { once: true },
          );
          if (signal.aborted) {
            clearTimeout(timer);
            reject(new DOMException("Cancelled", "AbortError"));
          }
        }),
    ),
  render: (app, id, active) => {
    if (!(app instanceof NotesApp))
      throw new Error("Invalid Notes registration");
    return <NotesView app={app} windowId={id} active={active} />;
  },
};
