"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDir = void 0;
const promises_1 = __importDefault(require("fs/promises"));
async function readDir(root, ignoreErrors) {
    try {
        const dirEntries = await promises_1.default.readdir(root, { withFileTypes: true });
        const directories = [];
        const files = [];
        for (const entry of dirEntries) {
            if (entry.isDirectory()) {
                directories.push(entry);
            }
            else if (entry.isFile()) {
                files.push(entry);
            }
        }
        return [root, directories, files];
    }
    catch (e) {
        if (ignoreErrors)
            return [root, [], []];
        throw e;
    }
}
exports.readDir = readDir;
