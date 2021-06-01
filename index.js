#!/usr/bin/env node
const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const shallow = require("shallow-equal");
const ObjectsToCsv = require("objects-to-csv");
const commandLineArgs = require("command-line-args");
const commandLineUsage = require("command-line-usage");

const sections = [
  {
    header: "CSV Merger",
    content: "Merge multiple CSV files and remove duplikats",
  },
  {
    header: "Options",
    optionList: [
      {
        name: "source",
        typeLabel: "{underline file}",
        description: "The source of CSV/s file/s.",
      },
      {
        name: "output",
        typeLabel: "{underline file}",
        description: "The output CSV file.",
      },
      {
        name: "help",
        description: "Print this usage guide.",
      },
    ],
  },
  {
    header: "Example",
    content:
      "merge-csv-keepass --source db1.csv db2.csv db3.csv --output merged.csv",
  },
];

const usage = commandLineUsage(sections);

const optionDefinitions = [
  { name: "source", type: String, alias: "s", multiple: true },
  { name: "output", type: String, alias: "o", multiple: false },
];

let options;

try {
  options = commandLineArgs(optionDefinitions);

  if (!options.source || !options.output) {
    return console.log(usage);
  }
} catch (error) {
  return console.log(usage);
}

let newList = [];
let countAll = 0;
let countSave = 0;
let countDel = 0;

const addItem = (item) => {
  let check = newList.some((x) => shallow.shallowEqualObjects(x, item));

  if (!check) {
    newList.push(item);
    countSave++;
  } else {
    countDel++;
  }
  countAll++;
};

for (let t = 0; t < options.source.length; t++) {
  let input;
  try {
    input = fs.readFileSync(options.source[t], "utf8");
    if (input) console.log(`File ${options.source[t]} done...`);
  } catch (error) {
    console.log(`Cannot open '${options.source[t]}' file. Skip...`);
  }

  let records = parse(input, { columns: true });

  records.map((e) => {
    addItem(e);
  });
}

// console.log(newList);

const generateCsv = async (data) => {
  const csv = new ObjectsToCsv(data);
  await csv.toDisk(options.output);

  return console.log(
    `\nProcessed: ${countAll} | Saved: ${countSave} | Deleted ${countDel} duplikats.`
  );
};

generateCsv(newList);
