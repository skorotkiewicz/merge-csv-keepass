# marge-csv

### Marge multiple CSV files and remove dublikats (e.g. Keepass)

The script checks each row, if even one column is different, it does not delete the entire row.

![screenshot](https://i.imgur.com/gDQVrwG.png)

## Install

```
$ npm install marge-csv -g
or
$ yarn global add marge-csv
```

## Usage

```
./marge-csv --source db1.csv db2.csv --output output.csv
```

or

```
./marge-csv -s db1.csv db2.csv -o output.csv
```

> Be careful, the script overwrites the output file!

## Developing

```
$ git clone https://github.com/skorotkiewicz/marge-csv-keepass

$ yarn install

# node marger.js
```
