# marge-csv-keepass

### A stupid simple script that gets the job done

Marge multiple CSV files and remove dublikats (e.g. Keepass)

The script checks each row, if even one column is different, it does not delete the entire row.

## Setup

```
$ git clone https://github.com/skorotkiewicz/marge-csv-keepass

$ yarn install
```

## Usage

```
node marger.js --source db1.csv db2.csv --output output.csv
```

or

```
node marger.js -s db1.csv db2.csv -o output.csv
```

Be careful, the script overwrites the output file!
