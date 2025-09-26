export interface CommandHistory {
  command: "help" | "ls" | "cd" | string;
  isSuccess: boolean;
  directories?: string[];
}
