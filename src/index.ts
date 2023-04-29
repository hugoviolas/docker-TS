import { Readable, Writable, Transform } from "node:stream";
import { createReadStream, createWriteStream } from "fs";
const JSONStream = require("JSONStream");
import * as path from "path";
import { TransformCallback } from "stream";
import csvParser from "csv-parser";

const relativePath: string = "./public/MOCK_DATA.csv";
const fullPath: string = path.join(process.cwd(), relativePath);
const read: Readable = createReadStream(fullPath);
const write: Writable = createWriteStream("./public/modifiedCSV.json");
const parser: Transform = csvParser();
const stringify: Transform = JSONStream.stringify();

class Modify extends Transform {
  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    chunk.gender === "Male" ? 1 === 1 : this.push(chunk);
    callback();
  }
}

const modify: Modify = new Modify({ objectMode: true });
process.on("beforeExit", () => {
  modify.end();
});

read.pipe(parser).pipe(modify).pipe(stringify).pipe(write);
