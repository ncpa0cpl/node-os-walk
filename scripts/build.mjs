import { build } from "@ncpa0cpl/nodepack";
import process from "node:process";
import path from "path";

build({
  target: "es2018",
  formats: ["cjs", "esm", "legacy"],
  srcDir: path.resolve(process.cwd(), "src"),
  outDir: path.resolve(process.cwd(), "dist"),
  tsConfig: path.resolve(process.cwd(), "tsconfig.build.json"),
  declarations: true,
});
