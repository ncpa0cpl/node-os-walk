import path from "path";
import { readDir } from "./read-dir";
import type { Directory, WalkOptions } from "./types";

export async function* walk(
  root: string,
  options: WalkOptions = {}
): AsyncGenerator<Directory> {
  options.followSymlinks ??= false;
  options.ignoreErrors ??= false;

  const result = await readDir(root, options.ignoreErrors);

  yield result;

  const [currentRoot, subDirectories] = result;

  for (const directory of subDirectories) {
    if (!options.followSymlinks && directory.isSymbolicLink()) continue;

    const subDirPath = path.resolve(currentRoot, directory.name);

    for await (const result of walk(subDirPath, options)) {
      yield result;
    }
  }
}
