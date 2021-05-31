const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const shallow = require("shallow-equal");
const ObjectsToCsv = require("objects-to-csv");

const source1 = process.argv[2] ? process.argv[2] : null;
const source2 = process.argv[3] ? process.argv[3] : null;
const target = process.argv[4] ? process.argv[4] : null;
let newList = [];
let countDub = 0;

if (source1 === null || source1 === null || target === null) {
  return console.log(
    `usage: ./marger <source1.csv> <source2.csv> <output.csv>`
  );
}

const addItem = (item) => {
  let check = newList.some((x) => shallow.shallowEqualObjects(x, item));

  if (!check) {
    newList.push(item);
  } else {
    countDub++;
  }
};

for (let t = 0; t < 2; t++) {
  let src;
  if (t === 0) src = source1;
  if (t === 1) src = source2;

  console.log(`File ${src} done...`);

  let input = fs.readFileSync(src, "utf8");
  let records = parse(input, { columns: true });

  records.map((e) => {
    addItem(e);
  });
}

// console.log(newList);

const generateCsv = async (data) => {
  const csv = new ObjectsToCsv(data);
  await csv.toDisk(target);

  return console.log(`\nDeleted ${countDub} dublikats.`);
};

generateCsv(newList);
