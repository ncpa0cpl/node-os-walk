# node-os-walk

Python's os.walk() implementation for Node.js environments with support for the `for await...of` loops.

> It is recommended to use ECMA 2018 target or newer with the `node-os-walk` lib.
> `for await...of` loops are not supported in older versions.

## Description

Generate the file names in a directory tree by walking the tree top-down. For each directory in the tree rooted at directory top (including top itself), it yields a 3-tuple: `[dirpath: string, directories: Array<fs.Dirent>, files: Array<fs.Dirent>]`

- `dirpath` - is a string, the path to the directory.
- `directories` - is a list of `Dirent` objects (from the standard fs Node library) pointing to all of directories found in the `dirpath`
- `files` - is a list of `Dirent` objects (from the standard fs Node library) pointing to all of files but not directories found in the `dirpath`

### Example

```ts
import { walk } from "node-os-walk";
import path from "path";

async function main() {
  const rootPath = path.resolve(__dirname, "./<your-path>");

  for await (const [root, dirs, files] of walk(rootPath)) {
    for (const directory of dirs) {
      console.log("Directory:", path.resolve(root, directory.name));
    }

    for (const file of files) {
      console.log("File:", path.resolve(root, file.name));
    }
  }
}
```

## Options

- **followSymlinks** - by default `walk()` will not list the contents of directories pointed to with symlinks, set this to true to change this behavior.

  > `walk(rootPath, { followSymlinks: true })`

- **ignoreErrors** - walk uses the `fs.readdir()` internally, if this option is set to true any errors thrown by `fs.readdir()` will be suppressed and an empty list of dirs and files will be returned.
  > `walk(rootPath, { ignoreErrors: true })`
