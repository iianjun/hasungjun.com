import type { Application } from "./desktop/bridge/react";
import { notesApplication } from "./apps/notes/application";
import { shapesApplication } from "./apps/shapes/application";

// Installed apps and Dock order. Each app owns its construction and presentation.
export const applications: readonly Application[] = [
  notesApplication,
  shapesApplication,
];
