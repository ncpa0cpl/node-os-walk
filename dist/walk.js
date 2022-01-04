"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walk = void 0;
const path_1 = __importDefault(require("path"));
const read_dir_1 = require("./read-dir");
async function* walk(root, options = {}) {
    options.followSymlinks ?? (options.followSymlinks = false);
    options.ignoreErrors ?? (options.ignoreErrors = false);
    const result = await (0, read_dir_1.readDir)(root, options.ignoreErrors);
    yield result;
    const [currentRoot, subDirectories] = result;
    for (const directory of subDirectories) {
        if (!options.followSymlinks && directory.isSymbolicLink())
            continue;
        const subDirPath = path_1.default.resolve(currentRoot, directory.name);
        for await (const result of walk(subDirPath, options)) {
            yield result;
        }
    }
}
exports.walk = walk;
