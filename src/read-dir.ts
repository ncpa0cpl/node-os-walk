import type { Dirent } from "fs";
import fs from "fs/promises";
import type { Directory } from "./types";

export async function readDir(
  root: string,
  ignoreErrors?: boolean
): Promise<Directory> {
  try {
    const dirEntries = await fs.readdir(root, { withFileTypes: true });

    const directories: Dirent[] = [];
    const files: Dirent[] = [];

    for (const entry of dirEntries) {
      if (entry.isDirectory()) {
        directories.push(entry);
      } else if (entry.isFile()) {
        files.push(entry);
      }
    }

    return [root, directories, files];
  } catch (e) {
    if (ignoreErrors) return [root, [], []];
    throw e;
  }
}
