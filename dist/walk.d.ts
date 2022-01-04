import type { Directory, WalkOptions } from "./types";
export declare function walk(root: string, options?: WalkOptions): AsyncGenerator<Directory>;
