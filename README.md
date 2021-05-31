# merge-csv-keepass

### Merge multiple CSV files and remove dublikats (e.g. Keepass)

The script checks each row, if even one column is different, it does not delete the entire row.

![screenshot](https://i.imgur.com/o0DMZlH.png)

## Install

```
$ npm install merge-csv-keepass -g
or
$ yarn global add merge-csv-keepass
```

## Usage

```
./merge-csv-keepass --source db1.csv db2.csv --output output.csv
```

or

```
./merge-csv-keepass -s db1.csv db2.csv -o output.csv
```

> Be careful, the script overwrites the output file!

## Developing

```
$ git clone https://github.com/skorotkiewicz/merge-csv-keepass

$ yarn install

# node index.js
```
