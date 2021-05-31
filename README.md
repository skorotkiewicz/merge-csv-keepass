# marge-csv-keepass

### A stupid simple script that gets the job done

Marge two databases and remove dublikats from CSV files (e.g. Keepass)

The script checks each row, if even one column is different, it does not delete the entire row.

## Setup

```
$ git clone https://github.com/skorotkiewicz/marge-csv-keepass

$ yarn install
```

## Usage

```
usage: ./marger <source1.csv> <source2.csv> <output.csv>
```

Be careful, the script overwrites the output file!
