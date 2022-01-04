import type { Dirent } from "fs";

export type Directory = Readonly<
  [root: string, directories: Dirent[], files: Dirent[]]
>;

export type WalkOptions = {
  /**
   * Visit directories pointed to by symlink if set to true.
   *
   * @default false
   */
  followSymlinks?: boolean;
  /**
   * Set to true to ignore filesystem read errors.
   *
   * @default false
   */
  ignoreErrors?: boolean;
};
