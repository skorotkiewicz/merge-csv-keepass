const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const shallow = require("shallow-equal");
const ObjectsToCsv = require("objects-to-csv");
const commandLineArgs = require("command-line-args");

const usage = `usage: ./marger --source <source1.csv> <source2.csv> <source3.csv> --output <output.csv>`;

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
  console.log(`File ${options.source[t]} done...`);

  let input = fs.readFileSync(options.source[t], "utf8");
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
    `\nProcessed: ${countAll} | Saved: ${countSave} | Deleted ${countDel} dublikats.`
  );
};

generateCsv(newList);
