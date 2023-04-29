import { Readable, Writable } from "node:stream";
import { createReadStream } from "fs";
import * as path from "path";

const relativePath = "./public/BigData.json";
const fullPath = path.join(process.cwd(), relativePath);
const read: Readable = createReadStream(fullPath);

read.on("data", (chunk) => {
  console.log("CHUNK", chunk.toString());
});
