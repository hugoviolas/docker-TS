"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_stream_1 = require("node:stream");
const fs_1 = require("fs");
const JSONStream = require("JSONStream");
const path = __importStar(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const relativePath = "./public/MOCK_DATA.csv";
const fullPath = path.join(process.cwd(), relativePath);
const read = (0, fs_1.createReadStream)(fullPath);
const write = (0, fs_1.createWriteStream)("./public/modifiedCSV.json");
const parser = (0, csv_parser_1.default)();
const stringify = JSONStream.stringify();
class Modify extends node_stream_1.Transform {
    _transform(chunk, encoding, callback) {
        chunk.gender === "Male" ? 1 === 1 : this.push(chunk);
        callback();
    }
}
const modify = new Modify({ objectMode: true });
process.on("beforeExit", () => {
    modify.end();
});
read.pipe(parser).pipe(modify).pipe(stringify).pipe(write);
