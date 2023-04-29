import { Readable, Writable, Transform } from "node:stream";
import csvParser from "csv-parser";
import { createReadStream, createWriteStream } from "node:fs";
import * as path from "path";
import { TransformCallback } from "stream";

const JSONStream = require("JSONStream");

const relativePath: string = "./public/salary.csv";
const fullPath: string = path.join(process.cwd(), relativePath);
const read: Readable = createReadStream(fullPath);
const write: Writable = createWriteStream("./public/modifySalary.json");
const stringify: Transform = JSONStream.stringify();
const parser: Transform = csvParser();

class Modify extends Transform {
  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    let salaryArray: string[] = chunk.salary.split("");
    let salary: number = parseInt(
      salaryArray.splice(1, salaryArray.length).join("")
    );
    this.push(returnSalary(chunk));
    callback();
  }
}

const modify: Modify = new Modify({ objectMode: true });

read.pipe(parser).pipe(modify).pipe(stringify).pipe(write);

function returnSalary(chunk: any) {
  let salaryArray: string[] = chunk.salary.split("");
  let salary: number = parseInt(
    salaryArray.splice(1, salaryArray.length).join("")
  );
  if (salary <= 10000) {
    chunk["salary"] = salary;
    chunk["net_salary"] = salary;
    return chunk;
  } else if (salary > 10000 && salary <= 50000) {
    chunk["salary"] = salary;
    chunk["net_salary"] = salary - (salary * 10) / 100;
    return chunk;
  } else if (salary > 50000 && salary <= 100000) {
    chunk["salary"] = salary;
    chunk["net_salary"] = salary - (salary * 20) / 100;
    return chunk;
  } else if (salary > 100000) {
    chunk["salary"] = salary;
    chunk["net_salary"] = salary - (salary * 30) / 100;
    return chunk;
  }
}
