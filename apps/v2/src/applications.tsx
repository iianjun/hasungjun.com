import type { Application } from "./desktop/bridge/react";
import { notesApplication } from "./apps/notes/application";
import { shapesApplication } from "./apps/shapes/application";

export const applications: readonly Application[] = [
  notesApplication,
  shapesApplication,
];
