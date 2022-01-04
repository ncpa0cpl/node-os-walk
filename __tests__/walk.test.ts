import path from "path";
import { walk } from "../src";

describe("walk()", () => {
  it("should correctly walk down the test directory", async () => {
    let i = 0;

    const rootPath = path.resolve(__dirname, "./walk-test-dir");

    expect.assertions(15);

    for await (const [root, dirs, files] of walk(rootPath)) {
      switch (i++) {
        case 0: {
          expect(root).toMatch(/.\/__tests__\/walk-test-dir$/);
          expect(dirs.map((d) => d.name)).toEqual(["a.dir", "b.dir"]);
          expect(files.map((f) => f.name)).toEqual(["a.file", "b.file"]);
          break;
        }
        case 1: {
          expect(root).toMatch(/.\/__tests__\/walk-test-dir\/a\.dir$/);
          expect(dirs.map((d) => d.name)).toEqual(["a-a.dir"]);
          expect(files.map((f) => f.name)).toEqual(["a-a.file", "a-b.file"]);
          break;
        }
        case 2: {
          expect(root).toMatch(
            /.\/__tests__\/walk-test-dir\/a\.dir\/a-a\.dir$/
          );
          expect(dirs.map((d) => d.name)).toEqual([]);
          expect(files.map((f) => f.name)).toEqual(["a-a-a.file"]);
          break;
        }
        case 3: {
          expect(root).toMatch(/.\/__tests__\/walk-test-dir\/b\.dir$/);
          expect(dirs.map((d) => d.name)).toEqual(["b-a.dir"]);
          expect(files.map((f) => f.name)).toEqual(["b-a.file", "b-b.file"]);
          break;
        }
        case 4: {
          expect(root).toMatch(
            /.\/__tests__\/walk-test-dir\/b\.dir\/b-a\.dir$/
          );
          expect(dirs.map((d) => d.name)).toEqual([]);
          expect(files.map((f) => f.name)).toEqual(["b-a-a.file"]);
          break;
        }
        default: {
          expect(1).toEqual(0); // should never happen
        }
      }
    }
  });
});
